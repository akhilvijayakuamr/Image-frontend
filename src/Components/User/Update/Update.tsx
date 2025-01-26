import React, { useState } from 'react'
import './Update.css'
import Header from '../Header/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import { SpecificUpdate } from '../../../Interface/AuthInterface'
import { ToastContainer, toast } from 'react-toastify'
import { specificUpdateAsync } from '../../../Actions/FileAction'
import { useDispatch } from 'react-redux'


const Update: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const updateDatas = location.state as SpecificUpdate
    const [updateData, setUpdateData] = useState<SpecificUpdate>({
        image:null,
        postId:updateDatas.postId,
        postTitle:updateDatas.postTitle
    })

    const handleUpdate = async () => {
        try {
            const response = await dispatch(specificUpdateAsync(updateData) as any)

            if (response.status >= 200 && response.status < 300) {
                console.log(response.message)
                toast.success(response.message, {
                    position: "top-right"
                });
                navigate('/posts')

            } else {
                toast.error(response.message, {
                    position: "top-right"
                });
            }
        } catch {
            toast.error("After some time you will retry", {
                position: "top-right"
            });
        }
    }
    
    return (
        <>
            <Header />
            <ToastContainer/>
            <div className="update-form-wrap">
                <h3 className="form-title">Update Image and Title</h3>
                <div className="form-content">
                    <div className="form-inputs">
                        <div className="input-group">
                            <label className="input-label" htmlFor="imageUpload">
                                Upload Image
                            </label>
                            <input 
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                className="image-input"
                                onChange={(e)=>setUpdateData({ ...updateData, image: e.target.files?.[0] ?? null })}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label" htmlFor="imageTitle">
                                Title
                            </label>
                            <input
                                type="text"
                                id="imageTitle"
                                className="title-input"
                                placeholder="Enter Image Title"
                                value={updateData.postTitle}
                                onChange={(e) => setUpdateData({ ...updateData, postTitle: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <button className="update-button"
                onClick={handleUpdate}
                >
                    Update
                </button>
            </div>
        </>
    )
}

export default Update