/* eslint-disable */
import { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  Box
} from '@material-ui/core';
import { getUserById, apiUpdateProfile, getPostsByUserId, getFavsByUserId } from '../../api';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PostCard from '../posts/Card';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Profile = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const [currUser, setCurrUser] = useState({});
  const [bio, setBio] = useState('');
  const [age, setAge] = useState(0);
  const [backyard, setBackyard] = useState('');
  const [energy, setEnergy] = useState('');
  const [freetime, setFreetime] = useState('');
  const [strength, setStrength] = useState('');
  const [value, setValue] = useState(0);

  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const updateFav = () => getFavsByUserId(id).then((res) => setFavourites(res.data));

  useEffect(() => {
    getUserById(id).then((res) => {
      setCurrUser(res.data);
      setBio(res.data.bio);
      setBackyard(res.data.backyard);
      setEnergy(res.data.energy);
      setFreetime(res.data.free_time);
      setStrength(res.data.strength);

      console.log(res.data);
    });

    getPostsByUserId(id).then((res) => setPosts(res.data));
    updateFav();
  }, []);

  const updateProfile = () => {
    const info = {
      id: id,
      backyard: backyard,
      energy: energy,
      free_time: freetime,
      strength: strength,
      bio
    };
    apiUpdateProfile(info).then((res) => console.log(res));
  };

  return (
    <>
      <Grid container spacing={3} style={{ margin: '5px' }}>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <div style={{ padding: '20px' }}>
              <Grid container>
                <Typography variant="h2">
                  {currUser.first_name} {currUser.last_name}
                  <br />
                </Typography>
              </Grid>
              <Grid container>
                <img src={currUser.profile_pic} height="200px" />
              </Grid>
              <br />

              <Typography color="textSecondary">Username: {currUser.username}</Typography>
              <Typography color="textSecondary">Email: {currUser.email}</Typography>
              <Typography color="textSecondary">Age: {currUser.age}</Typography>
              <Typography color="textSecondary">
                Joined: {new Date(currUser.created_at).toDateString()}
              </Typography>
              <br />
              <hr />
              <br />

              <Grid container>
                <Grid item xs={4}>
                  <Typography color="textSecondary"> Backyard:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    style={{ width: '100%' }}
                    size="small"
                    value={backyard}
                    onChange={(e) => setBackyard(e.target.value)}
                  >
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <Grid item xs={4}>
                  <Typography color="textSecondary"> Energy:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    style={{ width: '100%' }}
                    size="small"
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <Grid item xs={4}>
                  <Typography color="textSecondary"> Free time:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    style={{ width: '100%' }}
                    size="small"
                    value={freetime}
                    onChange={(e) => setFreetime(e.target.value)}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <br />
              <Grid container>
                <Grid item xs={4}>
                  <Typography color="textSecondary"> Strength:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select
                    style={{ width: '100%' }}
                    size="small"
                    value={strength}
                    onChange={(e) => setStrength(e.target.value)}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Typography color="textSecondary">Bio:</Typography>
              <TextareaAutosize
                style={{ width: '100%', minHeight: '50px' }}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />

              <br />
              <Button style={{ width: '100%' }} onClick={updateProfile}>
                Update Profile
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper elevation={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Posts" />
              <Tab label="Favourites" />
              <Tab label="Recommendations" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Grid container spacing={3}>
                {posts.map((post, item) => (
                  <Grid item xs={6}>
                    <div
                      style={{ cursor: 'pointer' }}
                      tabIndex={item}
                      role="button"
                      onClick={(item) => handleClick(post)}
                    >
                      <PostCard post={post} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Grid container spacing={3}>
                {favourites.map((post, item) => (
                  <Grid item xs={6}>
                    <div
                      style={{ cursor: 'pointer' }}
                      tabIndex={item}
                      role="button"
                      onClick={(item) => handleClick(post)}
                    >
                      <PostCard post={post} />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
