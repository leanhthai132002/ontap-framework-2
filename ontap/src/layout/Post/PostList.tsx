import React, { useEffect, useState } from "react";
import { getPosts, deletePost } from "../../api/post";
import { Link } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'

type POST_TYPE = {
    id: number,
    title: string,
    price: number
};

export default function PostList() {
    const [posts, setPosts] = useState<POST_TYPE[]>([]);

    const handleGetPosts = async () => {
        const response = await getPosts();
        setPosts(response.data)
    };

    const ondelete = async (id: number) => {
        const response = await deletePost(id);
        if (response.status === 200) {
            handleGetPosts();
        }
    }

    useEffect(() => {
        handleGetPosts();
    }, [])

    return (
        <div>
            <Header />
            <div >
                <Link
                    className="btn btn-primary"
                    style={{ margin: "0px 10px" }}
                    to={"/post/create"}
                >
                    Tạo mới post
                </Link>
            </div>
            <div style={{ marginBottom: "432px" }}>
                <table className="table">
                    <thead>
                        <tr>
                            <td scope="col">ID</td>
                            <td scope="col">title</td>
                            <td scope="col">price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.price}</td>

                                    <td><Link className="btn btn-warning" to={`/post/edit/${post.id}`}>Chỉnh sửa</Link></td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => ondelete(post.id as number)}>
                                            <p>Xoá</p>

                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}