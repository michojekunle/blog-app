import React, { useContext, useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';


const LikeButton = () => {
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const { authProfile } = useContext(AuthContext);
    const filterLikes = likes?.filter(item => item._ref === authProfile?._id);

    // useEffect(() => {
    //     if(filterLikes?.length > 0){
    //         setAlreadyLiked(true)
    //     } else {
    //         setAlreadyLiked(false)
    //     }
    // }, [filterLikes, likes])

  return (
    <div>
        <div className="mt-4 flex justify-center cursor-pointer items-center gap-3 hover:scale-105 focus:scale-95">
            {alreadyLiked ? (
                <div className='bg-blue-300 rounded-full p-2 md:p-4 text-blue-700 ' onClick={handleDislike}>
                    <MdFavorite className="text-lg md:text-2xl"/>
                </div>
            ): (
                <div className='bg-blue-400 rounded-full p-2 md:p-4 text-blue-50 ' onClick={handleLike}>
                    <MdFavorite className="text-lg md:text-2xl"/>
                </div> 
            )}
            <p className="text-md font-semibold">{ likes?.length | 0 }</p>
        </div>
    </div>
  )
}

export default LikeButton