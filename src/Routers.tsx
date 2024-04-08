import { Layout, Menu, MenuProps } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer } from 'antd/es/layout/layout'
import { Link, Outlet, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import React from 'react'
import RolePage from './pages/role/RolePage'

const menuItems: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: <Link to={'/role/list'}>{`nav ${index}`}</Link>,
}))

const Root: React.FC = () => (
  <Layout hasSider>
    <Sider className="overflow-auto h-dvh fixed left-0 top-0 bottom-0">
      <Menu theme="dark" mode="inline" items={menuItems} />
    </Sider>
    <Layout>
      <Layout.Header />
      <Content className="m-10 p-5">
        <Outlet />
      </Content>
      <Footer></Footer>
    </Layout>
  </Layout>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '*',
        element: <ErrorPage.NotFound />,
      },
      {
        path: '/role/list',
        element: <RolePage />,
      },
    ],
  },
])

export default router
