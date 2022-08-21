// Imports
import Feed from '../Components/Feed'
import useStyles from '../styles/Styles'
import Layout from '../Components/Layout'


// Main Function
const Home = () => {

  const classes = useStyles();

  return (
    <>    
      <Layout title='Home Page'>
        <div className={classes.indexFeedContainer}>
          <Feed />
        </div>
      </Layout>
    </>
  )
}


// Export
export default Home;