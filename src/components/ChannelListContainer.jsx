import React from 'react';
import Cookies from 'universal-cookie';


import { ChannelList,useChatContext } from 'stream-chat-react';
import { ChannelSearch,TeamChannelList,TeamChannelPreview } from './';


import HospitalIcon from '../assets/hospital.png'
import LogoutIcon from '../assets/logout.png'

import '../App.css';
const SideBar=({logout})=>{
  return(
    
    <div className="channel-list__sidebar">
      <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={HospitalIcon} alt='hospital' width="30"/>
            </div>
        </div>

        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt='Logout' width="30"/>
            </div>
    </div>

    </div>

  )
    
       

        
   
}

const CompanyHeader=()=>{
  return(
    <div className='channel-list__header'>
      <p className='channel-list__header__text'>Medical Pager</p>
    </div>
     
    
  )
           
}
const ChannelListContainer = () => {
  const cookies=new Cookies();
  const logout=()=>{
    cookies.remove('token');
    cookies.remove(`userId`);
    cookies.remove(`username`);
    cookies.remove(`fullName`);
    cookies.remove('avatarURL');
    cookies.remove('hashedPassword');
    cookies.remove('phoneNumber');

    window.location.reload();
    }
 
  return (
   <>
    <SideBar logout={logout}/>
    <div className='channel-list__list__wrapper'>
      <CompanyHeader/>
      <ChannelSearch/>

  <ChannelList 
      filters={{}}
      channelRenderFilterFn={()=>{}}
      List={(listProps)=>{
        console.log('hai');
         return(<TeamChannelList 
         {...listProps
         }
         type="team"
         />);
      }}
      Preview={(previewProps)=>{
        return(<TeamChannelPreview
          {...previewProps}
          type="team"
        />)
      }}
      />


<ChannelList 
      filters={{}}
      channelRenderFilterFn={()=>{}}
      List={(listProps)=>{
        console.log('hai');
        return(<TeamChannelList 
         {...listProps
         }
         type="messaging"
         />);
      }}
      Preview={(previewProps)=>{
       return(<TeamChannelPreview
          {...previewProps}
          type="messaging"
        />);
      }}
      />


    </div>
   </>
  )
}

export default ChannelListContainer;
