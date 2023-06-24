import React from 'react'
import Sidebar from '../ComponentsAdmin/SideBar/SideBar'
import AllProductsAdmin from '../ComponentsAdmin/Products/AllProductsAdmin'
import ProductAdmin from '../ComponentsAdmin/Products/ProductAdmin'
import TablePrducts from '../ComponentsAdmin/Products/TableProducts'

const Products = () => {
  return (
    <div>
        <Sidebar />
        <AllProductsAdmin />
        <ProductAdmin />
        <TablePrducts />
    </div>
  )
}

export default Products