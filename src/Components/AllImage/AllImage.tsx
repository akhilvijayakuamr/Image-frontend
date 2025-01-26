import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Image, ImageUpdate, SpecificUpdate } from '../../Interface/AuthInterface';
import { useDispatch } from 'react-redux';
import { allPostAsync, imageDeleteAsync, imageUpdateAsync } from '../../Actions/Action';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../User/Header/Header';
import './AllImage.css';
import { useNavigate } from 'react-router-dom';

const AllImage: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const swapIdRef = useRef<ImageUpdate>({
    sourceId: '',
    destinationId: ''
  })

  const updateRef = useRef<SpecificUpdate>({
    postId:'',
    postTitle:'',
    image:null
  })

  const deleteRef = useRef<string>('')

  // Get all images

  const handleGet = async () => {
    try {
      const response = await dispatch(allPostAsync() as any);
      if (response.status >= 200 && response.status < 300) {
        console.log(response.data)
        setImages(response.data);
        toast.success(response.message, {
          position: 'top-right',
        });
      } else {
        toast.error(response.message, {
          position: 'top-right',
        });
      }
    } catch {
      toast.error('After some time you will retry', {
        position: 'top-right',
      });
    }
  };




  // Updata image

  const handleupdate = async () => {
    try {
      const response = await dispatch(imageUpdateAsync(swapIdRef.current) as any);
      if (response.status >= 200 && response.status < 300) {
        toast.success(response.message, {
          position: 'top-right',
        });
      } else {
        toast.error(response.message, {
          position: 'top-right',
        });
      }
    } catch {
      toast.error('After some time you will retry', {
        position: 'top-right',
      });
    }
  };


  // Delete image

  const handleDelete = async (id:string) => {
    deleteRef.current = id
    try {
      const response = await dispatch(imageDeleteAsync(deleteRef.current) as any);
      if (response.status >= 200 && response.status < 300) {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        toast.success(response.message, {
          position: 'top-right',
        });
      } else {
        toast.error(response.message, {
          position: 'top-right',
        });
      }
    } catch {
      toast.error('After some time you will retry', {
        position: 'top-right',
      });
    }
  }


  // Updata specific image


  const handleUniqueUpdate = (id:string, title:string) =>{
    updateRef.current.postId = id
    updateRef.current.postTitle = title
    navigate('/update', {state:updateRef.current})
  }



  useEffect(() => {
    handleGet();
  }, []);

  // Handle drag and drop
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;


    const updatedImages = [...images];

    // Swap the images between source and destination indices
    const tempImage = updatedImages[sourceIndex].image;
    updatedImages[sourceIndex].image = updatedImages[destinationIndex].image;
    updatedImages[destinationIndex].image = tempImage;
    const sourceImageId = images[sourceIndex].id;
    const destinationImageId = images[destinationIndex].id;

    swapIdRef.current.sourceId = sourceImageId
    swapIdRef.current.destinationId = destinationImageId
    handleupdate()
    setImages(updatedImages);
  };

  return (
    <div className="top1">
      <Header />
      <ToastContainer />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div
              className="main-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((post, index) => (
                <Draggable key={post.id} draggableId={String(post.id)} index={index}>
                  {(provided) => (
                    <div
                      className="card-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <img
                        className="card-img"
                        src={`http://127.0.0.1:8000${post.image}`}
                        alt={post.title || `Image ${index + 1}`}
                      />
                      <div className="card-content">
                        <h3 className="card-heading">{post.title || `Image ${index + 1}`}</h3>
                        <a  className="card-link" onClick={()=>handleDelete(String(post.id))}>
                          Delete
                        </a>
                        <a className="card-link" style={{ background: "green" }} onClick={()=>handleUniqueUpdate(String(post.id), post.title)}>
                          Update
                        </a>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AllImage;
