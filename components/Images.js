import React from 'react'

const Images = ({ files ,setFiles }) => {

  const deleteFile = (url)=>{
    setFiles(files.filter(file=> file.url !== url))
  }
    return (
      <div className={`w-full max-h-[400px] overflow-y-scroll grid gap-2 ${files.length ===1 ? 'grid-cols-1':" grid-cols-2"}`} >
        {files?.map((file, index) => (
          <div key={index} className='w-full relative'>
            {file?.type?.includes('image') ? (
              <div className='w-full max-h-full'>
                <img className='' src={file?.url} alt={`Image ${index}`} />
                <button onClick={()=> deleteFile(file?.url)} className=' btn btn-circle right-1 top-1 absolute btn-sm no-animation bg-base-300'>X</button>
              </div>
            ) :""}
          </div>
        ))}
      </div>
    );
  };
  

export default Images