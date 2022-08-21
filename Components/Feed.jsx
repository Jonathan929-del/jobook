// Improts
import axios from 'axios'
import Post from './Post'
import Share from './Share'
import dynamic from 'next/dynamic'
import {Store} from '../Utils/Store'
import useStyles from '../styles/Styles'
import {useContext, useEffect, useState} from 'react'


// Main Function
const Feed = ({posts, user}) => {

    const classes = useStyles();
    const {state} = useContext(Store);
    const {userInfo} = state;
    const [feedPosts, setFeedPosts] = useState([]);

    useEffect(() => {
        const postsFetcher = async () => {
            try {
                const {data} = await axios.post('/api/posts/feed', {ids:[userInfo.following.map(id => id), userInfo.id]});
                setFeedPosts(data.map(user => user.sort(
                    (p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    }
                )));
            } catch (err) {
                console.log(err);
            }
        };
        postsFetcher();
    }, []);
    
    
    return (
        <div className={classes.feed}>
            {!userInfo ? '' : !user ? <Share /> : user?._id === userInfo?.id && <Share />}
            <div className={classes.postsContainer}>
                {
                    user
                        ? posts.map(post => (
                            <Post post={post} key={post.postId}/>
                        ))
                        : feedPosts.map(user => user.map(post => (
                            <Post post={post} key={post.postId}/>
                        )))

                }
            </div>
        </div>
    )
}


// Export
export default dynamic(() => Promise.resolve(Feed), {ssr:false});