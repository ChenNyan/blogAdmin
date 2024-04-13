'use client'

import {useState, useEffect, useRef} from "react";
import { Button, Input, message, Table, Pagination } from 'antd';
import styles from "../css/childPage.moudule.css"
import {addCate, delCate, editCate, getCate} from "@/app/api/cate";
export default function CateManage() {

  const [cate_name, setCateName] = useState('')
  useEffect(() => {
  },[{}])

  const ref = useRef(true);
  const isFirst = useRef(true);
  const flag = useRef(0);

  useEffect(() => {
    if (ref.current) {
      getTableData()
      ref.current = false;
      // 在组件首次渲染时执行某些操作
    }
  },[]);

  const cateNameChange = (e) => {
    setCateName(e.target.value)
  }

  const submitCateData = async () => {
    if(!isEdit){
      const res = await addCate({cate_name})
      if(res.code == 200){
        message.success(res.msg)
        setCateName('')
        getTableData()
      } else {
        message.error(res.msg)
      }
    } else {
      const res = await editCate({cate_name,id})
      if(res.code == 200){
        message.success(res.msg)
        setCateName('')
        setIsEdit(false)
        setId('')
        getTableData()
      } else {
        message.error(res.msg)
      }
    }
  }

  const [tableData, setTableData] = useState([])
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [total, setTotal] = useState(0)
  const getTableData = async () => {
    const res = await getCate({page,size})
    if(res.code == 200){
      setTableData(res.data.data)
      setTotal(res.data.count)
    } else {
      message.error(res.msg)
    }
  }

  useEffect(() => {
    if(!isFirst.current){
      getTableData()
    } else {
      flag.current += 1
      if(flag.current == 2){
        isFirst.current = false
      }
    }
  }, [page, size]);


  const pageChange = (page,size) => {
    setPage(page)
    setSize(size)
  }

  const delRow = async (row) => {
    const res = await delCate({id:row.id})
    if(res.code == 200){
      message.success(res.msg)
      getTableData()
    } else {
      message.error(res.msg)
    }
  }

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState('')

  const editRow = (row) => {
    setIsEdit(true)
    setCateName(row.cate_name)
    setId(row.id)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '分类名',
      dataIndex: 'cate_name',
      key: 'cate_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },

    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='text' onClick={e => editRow(record)}>编辑</Button>
          <Button type='text' onClick={e => delRow(record)}>删除</Button>
        </>
      ),
    },
  ];

  return (
    <main class='childMain'>
      <div>
        <div className='topForm'>
          <div className='topFormItem'>
            <span>分类名称:</span><Input value={cate_name} onChange={cateNameChange} />
          </div>
          <div className='topFormItem'>
            <Button type='primary' onClick={submitCateData}>保存</Button>
          </div>
        </div>
        <Table dataSource={tableData} columns={columns} pagination={false} />
        <Pagination
          total={total}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `共 ${total} 条`}
          defaultPageSize={size}
          defaultCurrent={page}
          onChange={pageChange}
        />
      </div>
    </main>
  );
}
