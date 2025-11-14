import React, { useEffect } from 'react'
import subscriberApi from '../../../api/subscribers'

function Subscriptondash() {

    useEffect(() => {
        const getsubs = async() => {
            const res = await subscriberApi.subscribedchannel()
        }
    })

  return (
    <div>Subscriptondash</div>
  )
}

export default Subscriptondash