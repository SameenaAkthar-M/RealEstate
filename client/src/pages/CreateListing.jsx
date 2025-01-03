import { useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


export default function CreateListing() {
  const navigate=useNavigate();
  const currentUser=useSelector((state)=>
    state.user
  )
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false)
  const [formData,setFormData]=useState({
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedroom:1,
    bathroom:1,
    regularPrice:0,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  });
  console.log(formData);
  const handleClick=(e)=>{
    e.preventDefault();
    navigate('/');
  }

  const handleChange=(e)=>{
    if(e.target.id==='sale' || e.target.id==='rent'){
      setFormData({
        ...formData,
        type:e.target.id
      })
    }

    if(e.target.id==='parking' || e.target.id==='offer'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked
      })
    }

    if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      setError(false);
      const res=await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          ...formData,
          userRef:currentUser._id
        })
      });
      const data=res.json();
      setLoading(false);
      if(data.success===false){
        setError(data.message);
      }
    }
    catch(error){
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flec-col sm:flex-row gap-4'>
        <div className="flex flex-col gap-4 flex-1">
          <input 
            type="text"
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea 
            type="text"
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input 
            type="text"
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input 
                type="checkbox" 
                id='sale' 
                className='w-5' 
                onChange={handleChange} checked={formData.type==="sale"}/>
              <span>Sell</span>
              <input 
                type="checkbox" 
                id='rent' 
                className='w-5'
                onChange={handleChange} checked={formData.type==="rent"}
                />
              <span>Rent</span>
              <input 
                type="checkbox" 
                id='parking' 
                className='w-5'
                onChange={handleChange} checked={formData.parking}
                />
              <span>Parking Spot</span>
              <input 
                type="checkbox" 
                id='furnish' 
                className='w-5'
                onChange={handleChange} checked={formData.furnish}
                />
              <span>Furnished</span>
              <input 
                type="checkbox" 
                id='offer' 
                className='w-5'
                onChange={handleChange} checked={formData.offer}
                />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center'>
              <input 
                type="number" 
                id='bedroom' 
                min='1' 
                max='10' 
                required 
                className='p-3 border-gray-300 rounded-lg'
                onChange={handleChange} checked={formData.bedroom}
                value={formData.bedroom}
                />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" 
                id='bathroom' 
                min='0' 
                max='10' 
                required 
                className='p-3 border-gray-300 rounded-lg'
                onChange={handleChange} checked={formData.bathroom}
                value={formData.bathroom}
                />
              <p>Bath</p>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" 
                id='regularPrice' 
                min='50' 
                max='1000000' 
                required 
                className='p-3 border-gray-300 rounded-lg'
                onChange={handleChange} checked={formData.regularPrice}
                value={formData.regularPrice}
                />
              <div className='flex flex-col items-center'>
                <p>Regular Price</p>
                <span className='text-xs'>Dollar/ month</span>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <input 
                type="number" 
                id='discountPrice' 
                min='1' 
                max='10' 
                required 
                className='p-3 border-gray-300 rounded-lg'
                onChange={handleChange} checked={formData.discountPrice}
                value={formData.discountPrice}
                />
              <div className='flex flex-col items-center'>
                <p>Discounted Price</p>
                <span className='text-xs'>Dollar/ month</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
          <div className='flex gap-4'>
            <input onChange={(e)=>setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className='p-3 border border-gray-300 rounded w-full'/>
            <button type='button' className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
          </div>
          <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80' onClick={handleClick}>{loading? 'Creating...':'Create'}</button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  )
}
