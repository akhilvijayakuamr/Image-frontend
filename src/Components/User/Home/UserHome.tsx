import React, { useRef, useState, ChangeEvent, DragEvent } from 'react';
import Header from '../Header/Header';
import './UserHome.css';
import { Image } from '../../../Interface/AuthInterface';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector} from 'react-redux';
import { createBlogAsync } from '../../../Actions/FileAction';
import { RootState } from '../../../Redux/store/store';






const UserHome: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isDraging, setIsDraging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch()
  const token = useSelector((state:RootState)=>state.auth.access)
  



  function selectfiles() {
    fileInputRef.current?.click();
  }


  function view() {
    console.log("all data == ", images)
  }


  function onFileSelect(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            file:files[i],
            url: URL.createObjectURL(files[i]),
            title: '',
            order:'0',
            id:'0',
            image:null
          },
        ]);
      }
    }
  }



  function deleteImage(index: number) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }




  function onDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraging(true);
    event.dataTransfer.dropEffect = "copy";
  }


  function onDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraging(false);
  }


  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraging(false);
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            file:files[i],
            url: URL.createObjectURL(files[i]),
            title: '',
            order:'0',
            id:'',
            image:null
          },
        ]);
      }
    }
  }



  // <=================================================================>


  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);


  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };


  const onDragOve = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };


  const onDro = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      [newImages[draggedIndex], newImages[index]] = [newImages[index], newImages[draggedIndex]];
      return newImages;
    });

    setDraggedIndex(null);
  };

  const updateTitle = (index: number, title: string) => {
    setImages((prevImages) =>
      prevImages.map((image, i) => (i === index ? { ...image, title } : image))
    );
  };



  const handleCreate = async (e:  React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(token)

    try {
      const response = await dispatch(createBlogAsync(images) as any)
      if (response.status >= 200 && response.status < 300) {
        setImages([])
        toast.success(response.message, {
          position: "top-right"
        });
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
    <div>
      <Header />
      <ToastContainer />
      <div className="card">
        <div className="top">

          <p className="upload-p">Upload Image</p>

        </div>
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isDraging ? (
            <span className="select">Drop Images here</span>
          ) : (
            <>
              Drag & Drop image here or{' '}
              <span className="select" role="button" onClick={selectfiles}>
                Browse
              </span>
            </>
          )}

          <input
            name="file"
            type="file"
            className="file"
            multiple
            ref={fileInputRef}
            onChange={onFileSelect}
          />
        </div>

        <button className="uplode-btn" type="button" onClick={handleCreate}>
          Upload
        </button>
        <input type='text' />
      </div>



      <div className="wrap">
        {images.map((image, index) => (
          <div
            className="box"
            key={index}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={onDragOve}
            onDrop={() => onDro(index)}
            onClick={view}
          >
            <span className="delete" onClick={() => deleteImage(index)}>
              &times;
            </span>
            <div className="box-top">
              <img className="box-image" src={image.url} alt={image.name} />
            </div>
            <input
              className="unititle"
              type="text"
              value={image.title || ''}
              placeholder="Enter title"
              onChange={(e) => updateTitle(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
