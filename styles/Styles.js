// Imports
import {makeStyles} from '@material-ui/core'


// Styles
const useStyles = makeStyles({

    // Navbar
    navbar:{
        position:'fixed',
        backgroundColor:'#1877f2',
        '& a':{
            color:'#fff',
            fontSize:15
        }
    },
    spaceBetween:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',

        '@media screen and (max-width:600px)':{
            display:'none'
        }
    },
    brand:{
        fontWeight:'bold',
        fontSize:'1.5rem',
        '@media screen and (max-width:600px)':{
            fontSize:'1.2rem'
        }
    },
    flex:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        '@media screen and (max-width:600px)':{
            display:'none'
        }
    },
    navContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    navInput:{
        height:30,
        width:'70%',
        maxWidth:500,
        border:'none',
        outline:'none',
        paddingLeft:10,
        margin:'0 10px',
        borderRadius:'50px',

        '@media screen and (max-width:500px)':{
            height:25,
            width:'70%',
            margin:'0 5px',
            fontSize:'12px'
        }
    },
    button:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        color:'#fff',
        fontSize:30,
        '@media screen and (max-width:600px)':{
            fontSize:25
        }
    },
    responsiveToolbar:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    /************************************************************/

    // Drawer
    menu:{
        fontSize:'1.5rem',
        cursor:'pointer'
    },
    menuItemsContainer:{
        display:'inline',
        '@media screen and (max-width:600px)':{
            width:'100%',
            display:'flex',
            justifyContent:'space-between',
        }
    },
    /**********************************************************/

    // Feed
    feed:{
        marginLeft:270,
        minHeight:'91.5vh',
        '@media screen and (max-width:600px)':{
            margin:'auto'
        }
    },
    postsContainer:{
        margin:'10px 0'
    },
    indexFeedContainer:{
        width:'100%',
        maxWidth:1000,
        margin:'90px 0',
        padding:'0 30px'
    },
    profileFeedContainer:{
        width:'100%',
        maxWidth:1200,
        padding:'0 30px'
    },
    /*********************************************************/

    // Footer
    footer:{
        width:'100%',
        marginTop:20,
        textAlign:'center',
    },
    /********************************************************/

    // Layout
    wrapper:{
        width:'100%',
        height:'100%',
        display:'flex',
    },
    footerWrapper:{
        height:'100%',
        width:'100%',
        display:'flex',
        flexDirection:'column',
    },
    main:{
        width:'100%',
        minHeight:'80vh',
    },
    /********************************************************/

    // Leftbar
    sidebar:{
        marginTop:65,
        position:'fixed',
        '@media screen and (max-width:600px)':{
            display:'none'
        }
    },
    sidebarBox:{
        height:'100%'
    },
    leftBarProfilePic:{
        width:50,
        height:50,
        cursor:'pointer',
        borderRadius:'50%',
        margin:'0 5px 0 -10px',
    },
    leftBarImgContainer:{
        height:100,
        width:230,
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    leftBarFriendsContainer:{
        width:'100%'
    },
    leftbarHeading:{
        marginLeft:10
    },
    /**********************************************************/

    // Post
    postUserNameArea:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    postImgContainer:{
        height:70,
        width:'100%',
        display:'flex',
        alignItems:'center',
        position:'relative',
        justifyContent:'flex-start'
    },
    postProfilePic:{
        width:50,
        height:50,
        margin:'0 5px',
        borderRadius:'50%',
        '@media screen and (max-width:400px)':{
            width:30,
            height:30,
            margin:'0 2px'
        }
    },
    postUsername:{
        '@media screen and (max-width:400px)':{
            fontSize:13
        }
    },
    feeling:{
        marginLeft:10,
        fontSize:'0.7rem',
        '@media screen and (max-width:400px)':{
            fontSize:'0.5rem',
            marginLeft:5
        }
    },
    postUpperIcon:{
        fontSize:25,
        cursor:'pointer'
    },
    postCaption:{
        marginLeft:10,
        '@media screen and (max-width:400px)':{
            marginLeft:5,
            fontSize:'0.8rem',
        }
    },
    postBottom:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        justifyContent:'space-between',
        '@media screen and (max-width:400px)':{
            fontSize:'0.8rem'
        }
    },
    postButtonContainer:{
        '@media screen and (max-width:400px)':{
            width:10,
            fontSize:'1rem'
        }        
    },
    postLikeIcon:{
        fontSize:25,
        '@media screen and (max-width:400px)':{
            fontSize:20
        }
    },
    postInputContainer:{
        width:'100%',
        position:'relative'
    },
    postForm:{
        width:'100%'
    },
    postInput:{
        height:50,
        width:'100%',
        paddingLeft:15,
        fontSize:'0.7rem',
    },
    commentPostButton:{
        top:10,
        right:0,
        fontSize:15,
        position:'absolute'
    },
    likesContainer:{
        display:'flex',
        margin:'10px 0',
        alignItems:'center',
        justifyContent:'center'
    },
    commentsContainer:{
        marginRight:10,
        '@media screen and (max-width:400px)':{
            marginRight:5,
        }
    },
    commentsButton:{
        '@media screen and (max-width:400px)':{
            fontSize:10
        }
    },
    postContainer:{
        marginTop:10
    },
    postDate:{
        top:45,
        left:60,
        fontSize:'0.6rem',
        position:'absolute',
        '@media screen and (max-width:400px)':{
            left:35,
            fontSize:'0.5rem'
        }
    },
    /***********************************************************/

    // Post update
    postUpdateContainer:{
        top:0,
        left:0,
        zIndex:2,
        width:'100%',
        height:'100%',
        display:'flex',
        position:'fixed',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00000073'
    },
    postUpdateCard:{
        width:'60%',
        maxWidth:800,
        minHeight:'10%',

        '@media screen and (max-width:768px)':{
            width:'90%'
        }
    },
    postUpdateGrid:{
        padding:10,
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    postUpdateHeading:{
        width:'100%',
        padding:'5px 0',
        textAlign:'center',
        position:'relative',
        borderBottom:'1px solid #ccc'
    },
    postUpdateClose:{
        top:20,
        right:0,
        position:'absolute',

        '@media screen and (max-width:400px)':{
            top:15
        }
    },
    postUpdateImgContainer:{
        paddingBottom:10,
        position:'relative',
        borderBottom:'1px solid #ccc'
    },
    postUpdateImg:{
        width:'100%'
    },
    postUpdateImgClose:{
        top:10,
        right:10,
        position:'absolute'
    },
    postUpdateText:{
        width:'100%',
        padding:'20px 0'
    },
    postUpdateButtonsContainer:{
        width:'100%',
        paddingTop:10,
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    postUpdateMoodContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',

        '@media screen and (max-width:400px)':{
            width:80,
            margin:'0 10px'
        }
    },
    postUpdateMood:{
        '@media screen and (max-width:992px)':{
            fontSize:'0.8rem'
        },
        '@media screen and (max-width:600px)':{
            fontSize:'1rem'
        },
        '@media screen and (max-width:400px)':{
            marginLeft:-15,
            fontSize:'0.6rem'
        }
    },
    postUpdateMoodButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '@media screen and (max-width:400px)':{
            marginLeft:-25,
            fontSize:'0.6rem'
        }
    },
    /**********************************************************/
    
    // Share
    shareCom:{
        marginTop:10,
        marginBottom:50
    },
    shareInput:{
        height:100,
        width:'100%',
        paddingLeft:30,
        fontSize:'0.7rem',
        '@media screen and (max-width:400px)':{
            height:70,
            paddingLeft:10
        }
    },
    postForm:{
        width:'100%',
        display:'flex',
        flexDirection:'column'
    },
    profileImgContainer:{
        height:70,
        width:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start'      
    },
    shareInputContainer:{
        width:'100%'
    },
    shareImgContainer:{
        width:'100%',
        display:'flex',
        alignItems:'center',
        position:'relative',
        justifyContent:'flex-start'
    },
    postImg:{
        width:'100%',
        marginTop:'10px'
    },
    gridContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    photoSelect:{
        width:70,
        display:'flex',
        cursor:'pointer',
        alignItems:'center',
        justifyContent:'center',
        '@media screen and (max-width:400px)':{
            fontSize:'0.8rem'
        }
    },
    shareButton:{
        '@media screen and (max-width:400px)':{
            fontSize:'0.8rem'
        }
    },
    mood:{
        '@media screen and (max-width:992px)':{
            width:60,
            fontSize:'0.8rem',
        },
        '@media screen and (max-width:600px)':{
            width:100,
            fontSize:'1rem',
        },
        '@media screen and (max-width:400px)':{
            fontSize:'0.8rem',
        }
    },
    moodContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    moodButton:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        '@media screen and (max-width:400px)':{
            fontSize:'0.8rem',
            marginLeft:-15
        }
    },
    imgCloseButton:{
        top:20,
        right:7,
        position:'absolute'
    },
    /************************************************************/

    // Login
    form:{
        maxWidth:800,
        margin:'0 auto'
    },
    /************************************************************/

    // Info
    profilePic:{
        borderRadius:'50%'
    },
    container:{
        width:100,
        height:110,
        borderRadius:'50%',
        position:'relative'
    },
    noProfilePic:{
        width:'100%',
        height:'100%',
        borderRadius:'50%',
    },
    layer:{
        top:-1,
        left:0,
        zIndex:'2',
        width:'101%',
        height:'93%',
        display:'flex',
        cursor:'pointer',
        fontSize:'0.6rem',
        borderRadius:'50%',
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#000000ab'
    },
    /*****************************************************************/

    // Profile
    backgroundPicCom:{
        height:350,
        width:'100%',
        overflow:'hidden',
        padding:'66px 0 0 281px',
        '@media screen and (max-width:600px)':{
            padding:'58px 0'
        }
    },
    backgroundImg:{
        width:'100%',
        height:'60%',
        display:'flex',
        objectFit:'cover',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00000059'
    },
    setBackgroundImg:{
        width:'100%',
        height:'60%',
        display:'flex',
        cursor:'pointer',
        objectFit:'cover',
        alignItems:'center',
        justifyContent:'center',
        transition:'0.1s linear',
        backgroundColor:'#00000059',

        '&:hover':{
            backgroundColor:'#00000075'
        }
    },
    profileTextContainer:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:-30
    },
    profileImgTextContainer:{
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-start'
    },
    bio:{
        width:'100%',
        textAlign:'center',
        margin:'20px 0 10px 0',
    },
    followButton:{
        color:'#fff',
        margin:'auto',
        backgroundColor:'#1877f2',

        '&:hover':{
            color:'#1877f2'
        }
    },
    /*************************************************/

    // Likes List
    likesListBox:{
        width:'100%'
    },
    likesListHeading:{
        fontSize:25,
        margin:'20px 100px',
        '@media screen and (max-width:600px)':{
            margin:'20px 50px'       
        },
        '@media screen and (max-width:400px)':{
            margin:'20px 0',
            textAlign:'center'
        }
    },
    /************************************************/


    // Comments List
    comment:{
        fontSize:'0.9rem',
        margin:'0 0 20px 30px',
        maxWidth:'200px',
        wordWrap:'break-word'
    },
    /************************************************/


    // Responsive Left Bar
    responsiveLeftbar:{
        marginTop:50,
        display:'none',

        '@media screen and (max-width:600px)':{
            display:'block'
        },
    }
    /***********************************************/
})


// Export
export default useStyles;