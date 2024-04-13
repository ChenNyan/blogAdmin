'use client'

import {useState, useEffect, useRef} from "react";

import EditorComponent from "./EditorComponent";

import {Button, Pagination, Table, message} from "antd";
import {addArticle, delArticle, editArticle, getArticle} from "@/app/api/article";
import {delCate, getCate} from "@/app/api/cate";

export default function ArticleManage() {


  const [editorLoaded, setEditorLoaded] = useState(false);

  const [content, setContent] = useState('')

  useEffect(() => {
    setEditorLoaded(true);
  }, []);


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

  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState('')
  const submit = async () => {
    if(!isEdit){
      const res = await addArticle({content})
      if(res.code === 200){
        message.success(res.msg)
        getTableData()
      } else {
        message.error(res.msg)
      }
    } else {
      const res = await editArticle({id, content})
      if(res.code === 200){
        message.success(res.msg)
        setContent('')
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
  const getTableData = async () => {
    const res = await getArticle({page,size})
    if(res.code == 200){
      setTableData(res.data.data)
      setTotal(res.data.count)
    } else {
      message.error(res.msg)
    }
  }

  const pageChange = (page,size) => {
    setPage(page)
    setSize(size)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
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

  const delRow = async (row) => {
    const res = await delArticle({id:row.id})
    if(res.code == 200){
      message.success(res.msg)
      getTableData()
    } else {
      message.error(res.msg)
    }
  }

  const editRow = (row) => {
    setIsEdit(true)
    setContent(row.content)
    setId(row.id)
  }

  return (
    <main className='childMain'>
      <div>
        <EditorComponent
          name="description"
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({event, editor, data});
            setContent(data)
          }}
          editorLoaded={editorLoaded}
        />
        <Button type='primary' onClick={submit}>保存</Button>

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
