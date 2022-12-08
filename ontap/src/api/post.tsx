import api from './api';

export const getPosts = () =>{
    return api.get('/post')
};
 
export const getPost = (id: string|undefined) =>{
    return api.get(`/post/${id}`)
}

export const createPost = (data: any) =>{
    return api.post('/post', data)
};

export const deletePost = (id: number|string) =>{
    return api.delete(`/post/${id}`)
};

export const updatePost = (id:string|undefined, data :any) =>{
    return api.put(`/post/${id}`, data)
};