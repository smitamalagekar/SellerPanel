import React, { useState } from 'react'
import ProductTable from './ProductTable'

function UserSearches() {

      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 10;

    const productStock = [
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
        { id:1,searchby: "Disney Men's Mickey and Friends Button Down Shirt", search: 32 },
      ];

    const columns = [
        {
            header: "#",
            accessor: (_, index) => index + 1,
          },
        {
          header: "Search By",
          accessor: (item) => item.searchby,
        },
        {
          header: "Number Searches",
          accessor: (item) => item.search,
        },
      ];
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
  return (
    <>

      <div className="bg-white m-5 p-5 shadow-lg rounded-lg mb-6 mx-4 md:mx-10 lg:mx-20 xl:mx-40">
        <div className="flex flex-col  md:flex-row md:items-center border-b">
          <h1 className="text-lg text-gray-800 pb-3">User Search Report
          </h1>
        
        </div>

         <ProductTable
                  columns={columns}
                  data={productStock}
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                />

      
      </div>
    </>
  )
}

export default UserSearches