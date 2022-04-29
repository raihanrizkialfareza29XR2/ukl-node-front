import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const TransaksiKonfirmasi = () => {

    const [utangs, setUtang] = useState([]);
    const [search, setSearch] = useState("");
    const history = useNavigate();
    const [pageNumber, setPageNumber] = useState(0)

    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage
    
    const displayData = utangs
    .slice(pagesVisited, pagesVisited + dataPerPage)
    .filter(utang => {
        if(search == "") {
            return utang
        }
        else if (utang.transaksi.kode_invoice.toLowerCase().includes(search.toLowerCase())){
            return utang
        }
    })
    .map((utang, index) => {
        <tr key={utang.id_detail_transaksi}>
            <td>{ index + 1 }</td>
            <td>{ utang.transaksi.kode_invoice }</td>
            <td>{ utang.transaksi.member.nama }</td>
            <td>{ utang.transaksi.status }</td>
            <td>{ utang.total_harga }</td>
            <td className="text-center">
                <Link to={`/transaksi/bayar/${utang.id_transaksi}`} className="btn btn-warning text-center">Bayar</Link>
            </td>
        </tr>
    })
    const role = () => {
        if (localStorage.getItem('role') !== 'admin' || localStorage.getItem('role') !== 'kasir') {
            history('/norole')
        }
    }

    useEffect(() => {
        role();
        getUtang();
    }, []);

    const getUtang = async () => {
        const response = await axios.get('http://localhost:8000/transaksi/belum/konfirmasi');
        console.log(response.data);
        setUtang(response.data)
    }
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil( utangs.length / dataPerPage );
    

  return (
    <div className="table table-responsive">
        <input 
        type="text" 
        placeholder="search invoice"
        className="form-control mb-3"
        onChange={(e) => {
            setSearch(e.target.value);
        }}
        />
        <table className="table table-bordered text-center">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Invoice</th>
                    <th>Member</th>
                    <th>Status</th>
                    <th>Total Harga</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                { displayData }
            </tbody>
        </table>
        <div className="aneh mt-5 d-flex">
            <ReactPaginate 
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButton"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledLinkClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    </div>
  )
}

export default TransaksiKonfirmasi