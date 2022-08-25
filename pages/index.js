// Imports
import {useContext} from 'react'
import {Store} from '../Utils/Store'
import Feed from '../Components/Feed'
import useStyles from '../styles/Styles'
import Layout from '../Components/Layout'


// Main Function
const Home = () => {

  const classes = useStyles();
  const {userInfo} = useContext(Store);

  return (
    <>    
      <Layout title='Home Page'>
        <div className={classes.indexFeedContainer}>
          {userInfo ? <Feed /> : <h2 style={{textAlign:'center', fontWeight:'300'}}>Login to see more posts</h2>}
        </div>
      </Layout>
    </>
  )
}


// Export
export default Home;