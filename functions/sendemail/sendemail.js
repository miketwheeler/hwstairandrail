require('dotenv').config()

const axios = require('axios');

exports.handler = async function(event, context) {
    if(!event.httpMethod === 'POST'){
        return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    let respondWith = 444;
    const parsedTemplateData = JSON.parse(event.body);
    const assembledData = JSON.stringify({
        "service_id": process.env.NEXT_PUBLIC_EJS_SID,
        "template_id": process.env.NEXT_PUBLIC_EJS_TID,
        "user_id": process.env.NEXT_PUBLIC_EJS_UID,
        "template_params": parsedTemplateData,
        "accessToken": process.env.NEXT_PUBLIC_KORAK
    });
    const config = { 
        method: 'options',
        url: process.env.NEXT_PUBLIC_EJSURL,
        headers: {
            'authorization': process.env.NEXT_PUBLIC_KORAK,
            'content-type': 'application/json',
        },
        data: assembledData
    }

    await axios(config)
    .then((response) => {
        console.log("response:: ", response)
        // respondWith = response.status;
        respondWith = response.status;
        // {
        //     statusCode: respondWith ? respondWith : 500,
        // }
    })
    .catch((error) => {
        console.log("error.response:: ", error.response)
        if(error.response)
            respondWith = error.response.status;
    })

    return { statusCode: respondWith };
    
}
