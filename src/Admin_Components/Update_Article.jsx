
import Add_Article from './Add_Article'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../Utility_Component/axiosInstancs';

function Update_Article() {
    const { _id } = useParams();
    const [error, setError] = useState({})
    const [post, setPost] = useState({});
    useEffect(() => {
        axios.get(`/admin/articles/${_id}`, { withCredentials: true })
            .then(response => {
                setPost(response.data.data); 
            }).catch(error => {
                setError(error.response);
            })
    }, [_id]);

    if (error.statusText) return <div className='flex flex-col items-center justify-center min-h-[90vh] text-2xl text-[var(--primary)]'>
        {error && <div className='flex items-center gap-2  font-bold'><span className='text-5xl'>{error.status}</span>|<span> {error.data?.message}</span></div>}
    </div>
    return (
        <div>
            {post && <Add_Article post={post} />}
        </div>
    )


}

export default Update_Article