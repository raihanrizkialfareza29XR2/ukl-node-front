import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPaket = () => {

    const [id_outlet, setId] = useState();
    const [jenis, setJenis] = useState('');
    const [nama_paket, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const role = () => {
        if (localStorage.getItem('role') !== 'admin') {
            history('/norole')
        }
    }
    const [outlets, setOutlet] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        role();
        getOutlet();
    }, []);

    const getOutlet = async () => {
        const response = await axios.get('http://localhost:8000/outlet');
        setOutlet(response.data.outlet)
    }
    // console.log(jenis);
    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/paket', {
            id_outlet: id_outlet,
            jenis: jenis,
            nama_paket: nama_paket,
            harga: harga
        });
        history('/');
    }
  return (
    <div>
        <form onSubmit={ saveProduct }>
            <div className="mb-2">
                <label>Outlet</label>
                <select 
                name="id_outlet" 
                value={id_outlet} 
                onChange={ (e) => {
                    const selectedId = e.target.value;
                    setId(selectedId);
                }}
                className="form-control"
                >
                    { outlets.map((outlet) => (
                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                    )) }
                    {/* <option value="1">{outlet.nama}</option> */}
                </select>
            </div>
            <div className="mb-2">
                <label>Jenis</label>
                <select 
                name="jenis" 
                value={jenis} 
                onChange={ (e) => {
                    const selectedJenis = e.target.value;
                    setJenis(selectedJenis);
                }}
                className="form-control"
                >
                    <option value="kiloan">Kiloan</option>
                    <option value="selimut">Selimut</option>
                    <option value="bedcover">Bedcover</option>
                    <option value="kaos">Kaos</option>
                </select>
            </div>
            <div className="mb-2">
                <label>Nama Paket</label>
                <input 
                    type="text" 
                    name="nama_paket" 
                    placeholder="Nama Paket" 
                    className="form-control"
                    value={nama_paket} 
                    onChange={ (e) => setNama(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <label>Harga</label>
                <input 
                    type="number" 
                    name="harga" 
                    placeholder="Harga" 
                    className="form-control"
                    value={harga} 
                    onChange={ (e) => setHarga(e.target.value) }
                />
            </div>
            <div className="mb-2">
                <button className='btn btn-primary'>Submit</button>
            </div>
        </form>
        {/* {jenis} */}
    </div>
  )
}

export default AddPaket