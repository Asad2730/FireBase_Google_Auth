import axios from "axios";
import { useEffect, useState } from "react";

export default function UserData() {
    const email = localStorage.getItem('email');
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [email]);

    const getData = async () => {
        try {
            let res = await axios.get(`http://localhost:8090/api/user/getByEmail/?email=${email}`);
            setData(res.data);
        } catch (ex) {
            console.log('Error:', ex);
        }
    }

    return (
        <div>
            {data.map((i) => (
                <div key={i.email}>
                    <div>Name: {i.displayName}</div>
                    <div>Email: {i.email}</div>
                    <div>Age: {i.age}</div>
                    <div>Gender: {i.gender}</div>
                </div>
            ))}
        </div>
    )
}
