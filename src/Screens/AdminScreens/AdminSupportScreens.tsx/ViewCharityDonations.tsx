import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase_config'
import { CharityModel } from '../../../Models/CharityModel'
import Navbar from '../AdminComponents/Navbar'
import CharityDisplayCard from '../AdminComponents/CharityDisplayCard'

const ViewCharityDonationsScreen:React.FC = () => {

  const [reviews,setReviews] = useState<CharityModel[]>([]);
  const [loading,setLoading] = useState<boolean>(false);

  useEffect(()=>{
    getReviews();
  },[]);

  const getReviews = async() => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db,"Charity"));
    const reviews: CharityModel[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as CharityModel[];
    setReviews(reviews);
    setLoading(false);
  }

  const handleDelete = (deletedReviewId: string) => {
    setReviews(reviews.filter(review => review.id !== deletedReviewId));
};


  return (
    <div className='w-full h-screen overflow-auto grid grid-cols-1 grid-rows-8 gap-3 sm:p-6'>
        <div className="col-span-1 row-span-1">
            <Navbar name='Charity Donations'/>
        </div>

        <div className='col-span-1 row-span-7 rounded-lg w-full h-full flex flex-col overflow-auto bg-white dark:bg-slate-700 p-4 space-y-5'>
          <div className='w-full grid grid-cols-6 py-5'>
            <div className='col-span-1 max-sm:col-span-3 flex flex-col justify-start'>
              <div>Name & Purpose & date</div>
            </div>
            <div className='col-span-2 flex flex-col justify-center items-center'>
              <div>Description</div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
              <div>Amount</div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
              <div>Image</div>
            </div>
            <div className='max-sm:hidden col-span-1 flex flex-col justify-center items-center'>
              <div>Action</div>
            </div>
          </div>
          {
            loading?(
              <div className='w-full h-full flex justify-center items-center'>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>
            ):(
              reviews.length===0?(
                <div className='w-full h-full flex justify-center items-center'>
                  No Donations
                </div>
              ):(
                reviews.map((review)=>(
                  <CharityDisplayCard charityObj={review} onDelete={handleDelete}/>
                ))
              )
            )
          }

          
        </div>
    </div>
  )
}

export default ViewCharityDonationsScreen
