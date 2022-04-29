import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import AddPaket from "./components/AddPaket";
import EditPaket from './components/EditPaket';
import OutletList from './components/OutletList';
import PaketList from "./components/PaketList";
import AddOutlet from './components/AddOutlet';
import EditOutlet from './components/EditOutlet';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import EditMember from './components/EditMember';
import TransaksiList from './components/TransaksiList';
import TransaksiCariMember from './components/TransaksiCariMember';
import AddTransaksi from './components/AddTransaksi';
import TransaksiKonfirmasi from './components/TransaksiKonfirmasi';
import TransaksiBayar from './components/TransaksiBayar';
import BayarSuccess from './components/BayarSuccess';
import TransaksiUbah from './components/TransaksiUbah';
import Login from './components/Login';
import './style.css';
import Invoice from './components/Invoice';
import Error from './components/Error';
import { useEffect } from 'react';

function Menu() {
    const history = useNavigate();
    useEffect(() => {
        // console.log(localStorage.getItem('isAuth'))
        if (localStorage.getItem('isAuth') !== 'true') {
          history('/login')
        }
    });
  return (
    <div>
        <Routes>
            <Route path='*' element={<Error />}></Route>
            <Route path='/member' element={<MemberList />}></Route>
            <Route path="/member/add" element={<AddMember />} />
            <Route path="/member/edit/:id_member" element={<EditMember />} />
            <Route path="/transaksi" element={<TransaksiList />} />
            <Route path="/transaksi/cari" element={<TransaksiCariMember />} />
            <Route path="/transaksi/add/:member_id" element={<AddTransaksi />} />
            <Route path="/transaksi/konfirmasi" element={<TransaksiKonfirmasi />} />
            <Route path="/transaksi/bayar/:id_transaksi" element={<TransaksiBayar />} />
            <Route path="/transaksi/invoice/page/:id_transaksi" element={<BayarSuccess />} />
            <Route path="/transaksi/ubah/:id_transaksi" element={<TransaksiUbah />} />
            <Route path="/invoice/:id_transaksi" element={<Invoice />} />
        </Routes>
    </div>
  );
}

export default Menu;
