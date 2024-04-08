import { Breadcrumb, Button, Table } from 'antd'
import data, { RoleType } from '../../data/role'
import Column from 'antd/es/table/Column'
import { Link } from 'react-router-dom'

const RolePage: React.FC = () => (
  <div>
    <Breadcrumb items={[{ title: '权限管理' }, { title: '角色管理' }]} />

    <div className="flex flex-row-reverse">
      <Button type="primary" style={{ marginBottom: 16 }}>
        创建新角色
      </Button>
    </div>

    <Table dataSource={data}>
      <Column title="ID" key="id" dataIndex="id" />
      <Column title="角色名称" key="roleName" dataIndex="roleName" />
      <Column title="用户数" key="roleName" dataIndex="userCount" />
      <Column title="创建者" key="roleName" dataIndex="createdBy" />
      <Column title="创建时间" key="roleName" dataIndex="createdAt" />
      <Column
        title="操作"
        key="action"
        render={(_, record: RoleType) => (
          <div className="flex space-x-2">
            <Link to={`/role/detail/${record.id}`}>查看人员</Link>
            <Link to={`/role/detail/${record.id}`}>设置权限</Link>
            <Link to={`/role/detail/${record.id}`}>复制</Link>
            <Link to={`/role/detail/${record.id}`}>删除</Link>
          </div>
        )}
      />
    </Table>
  </div>
)

export default RolePage
