import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import {BsPlusCircle, BsPencilSquare, BsTrash} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';

const Lists = () => {

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(`${appLocalizer.rest_url}`);
  const nonce = `${appLocalizer.nonce}`


    const columns = [
        {
          name: "NAME",
          selector: (row) => row.name,
        },
        {
          name: "UV",
          selector: (row) => row.uv,
        },
        {
          name: "PV",
          selector: (row) => row.pv,
        },
        {
          name: "AMT",
          selector: (row) => row.amt,
        },
        {
          name: "DATE",
          selector: (row) => row.dateT,
        },
        
        {
          name: "Action",
          cell: (row) => (
            <div className="flex items-center space-x-2">
              <button
                disabled={loading}
                onClick={() =>
                  window.confirm("Are you sure You want to delete it?") &&
                  deleteItem(row.id)
                }
                className="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600"
              >
                <BsTrash />
              </button>
            </div>
          ),
        },
      ];



    const deleteItem = (id) => {
      setLoading(true);
      axios.delete(`${url}/settings/${id}`, {
            headers: {
                'X-WP-Nonce': nonce, 
            },
        })
        .then((res) => {
          getData()
          toast.success("Deleted Successfully!");
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
            setLoading(false);
        });
    }

    const getData = () => {
      setLoading(true)
        axios.get(url + '/settings').then((res) => {
          setData(res.data)
          setLoading(false)
        }).catch((err) => {
          setData(res.data)
          setLoading(false)
        })
    }

    useEffect(() => {
      getData();
      }, [])

  return (
    <>
        <DataTable
          columns={columns}
          data={data}
          title="List"
          selectableRows
          fixedHeader
          pagination
          actions={
            <Link to={'/add-new'}
              className="px-4 py-2 flex gap-2 items-center text-sm bg-green-500 text-white"
            >
              <BsPlusCircle /> <span>Add New</span>
            </Link>
          }
        />
    </>
  )
}

export default Lists