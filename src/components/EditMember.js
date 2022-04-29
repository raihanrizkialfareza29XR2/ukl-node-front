import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMember = () => {

    const [nama, setNama] = useState();
    const [alamat, setAlamat] = useState('');
    const [jenis_kelamin, setJenis_kelamin] = useState('');

    const history = useNavigate();
    const {id_member} = useParams();
    const role = () => {
        if (localStorage.getItem('role') !== 'admin' || localStorage.getItem('role') !== 'kasir') {
            history('/norole')
        }
    }

    // console.log(jenis);
    const updateProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/member/${id_member}`, {
            nama: nama,
            alamat: alamat,
            jenis_kelamin: jenis_kelamin,
        });
        history('/member');
    }

    useEffect(() => {
        role();
        getMemberById();
    }, []);

    const getMemberById = async () => {
        const response = await axios.get(`http://localhost:8000/member/${id_member}`);
        console.log(response.data);
        setNama(response.data.member.nama);
        setAlamat(response.data.member.alamat);
        setJenis_kelamin(response.data.member.jenis_kelamin);
    }
  return (
    <div>
        <form onSubmit={ updateProduct }>
        <div className="mb-2">
                <label>Nama Member</label>
                <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama Member" 
                    className="form-control"
                    value={nama} 
                    onChange={ (e) => setNama(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Alamat</label>
                <input 
                    type="text" 
                    name="alamat" 
                    placeholder="Alamat Member" 
                    className="form-control"
                    value={alamat} 
                    onChange={ (e) => setAlamat(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Jenis Kelamin</label>
                <input 
                    type="text" 
                    name="jenis_kelamin" 
                    placeholder="Nomor Outlet" 
                    className="form-control"
                    value={jenis_kelamin} 
                    onChange={ (e) => setJenis_kelamin(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Update</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default EditMember