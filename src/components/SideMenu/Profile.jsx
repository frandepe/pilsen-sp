import { makeStyles } from '@material-ui/core'
import React from 'react'
import backgraund_image from "../../image/Nico.jpg"


const useStyle = makeStyles(theme => ({
     root: {
          display:"flex",
          gap:"15px",
          justifyContent:"center",
          alignItems:"center",
          flexWrap:"wrap",
          padding: theme.spacing(1),
     },
     img:{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          background: "rgba(255, 255, 255, 0.2)",
          backgroundImage:`url(${backgraund_image})`,
          backgroundPosition:"center",
          backgroundSize:"cover",
          backgroundRepeat:"no-repeat",
          width:"50px",
          height:"50px",
          borderRadius:"100%",
     },
     name:{
          fontSize:"1.2rem",
     },
     rol:{
          fontSize:"1rem",
     }

}))

export default function Profile() {
  const classes = useStyle()
  return (
    <div className={classes.root}>
         <div className={classes.img}>
          </div>
         <div className={classes.text}>
              <div className={classes.name}>Nicolas Grillo</div>
              <div className={classes.rol}>Administrador</div>
          </div>
    </div>
  )
}
