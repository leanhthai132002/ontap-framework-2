import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPost, getPost, updatePost } from '../../api/post';
import Header from '../components/Header'
import Footer from '../components/Footer'


type POST_TYPE = {
    title: string,
    price: number
};

function PostForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            title: '',
            price: 0,
        }
    });

    const onSubmit: SubmitHandler<POST_TYPE> = (data) => {
        const submitData = {
            ...data,
            price: +data.price
        };
        if (id) {
            return handleUpdatePost(submitData)
        }
        return handleCreatePost(submitData);
    };
    const handleCreatePost = async (data: POST_TYPE) => {
        const response = await createPost(data);

        if (response.status === 201) {
            navigate('/post');
        }
    };

    const handleUpdatePost = async (data: POST_TYPE) => {
        const response = await updatePost(id, data);

        if (response.status === 200) {
            navigate('/post');
        }

    };

    const handleGetPost = async (id: string) => {
        const response = await getPost(id);
        if (response.status === 200) {
            reset({
                ...response.data,
                status: `${response.data.status}`
            });
        }
    }

    useEffect(() => {
        if (id) {
            handleGetPost(id);
        }
    }, [id]);
    return (
        <div>
             <Header/>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} style={{
                    width: "60%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: "20px",
                }}>

                    <div >
                        <label className="form-label" htmlFor="">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Tiêu đề'
                            {...register(
                                'title',
                                {
                                    required: { value: true, message: 'Bắt buộc' },
                                }
                            )}
                        />
                        <div>{errors.title?.message}</div>
                    </div>

                    <div >
                        <label className="form-label" htmlFor="">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Giá'
                            {...register(
                                'price',
                                {
                                    required: { value: true, message: 'Bắt buộc' },
                                }
                            )}
                        />
                        <div>{errors.price?.message}</div>
                    </div>


     
   

                    <button className="btn btn-dark">Submit</button>
                    <Link
                        className="btn btn-dark"
                        style={{ margin: "0px 10px" }}
                        to={"/post"}
                    >
                        Trở Lại
                    </Link>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default PostForm