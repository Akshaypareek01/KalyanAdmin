import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate } from "react-router-dom";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Base_Url2 } from "../../../Config/BaseUrl";

const Item = styled(Box)(() => ({
  textAlign: "center",
  color: "black",
}));
export const SliderImage = () => {
  const Token = sessionStorage.getItem("token") || null;
  const [Posters, setPosters] = React.useState([]);
  const [update, setUpdate] = React.useState(0);
  const [imageBase64, setImageBase64] = React.useState("");
  const fetchPostsData = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.get(
        `${Base_Url2}banners`,

        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Berear ${Token}`, // Set the content type to form data
          },
        }
      );
      const data = response.data;

      if (data.post && data !== undefined) {
        console.log("POST request response games in banners:", data);

        setPosters(data.post);
      }

      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");

      // Handle error
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageBase64(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  const UplodePost = async () => {
    try {
      // setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imageBase64);
      const response = await axios.post(`${Base_Url2}banner_add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Berear ${Token}`, // Set the content type to form data
        },
      });
      const data = response.data;

      setUpdate((prev) => prev + 1);

      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");

      // Handle error
    }
  };

  const handelDeletePost=async(id)=>{
    try {
      // setIsLoading(true);
      const formData = new FormData();
      formData.append("image", imageBase64);
      const response = await axios.post(`${Base_Url2}banner_delete/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Berear ${Token}`, // Set the content type to form data
        },
      });
      const data = response.data;

      setUpdate((prev) => prev + 1);

      return data;
      // Handle success
    } catch (error) {
      console.error("Error sending POST request:", error);
      // showToast("error", "Game Data Not Found Login Again ", "");

      // Handle error
    }
  }
  
  const handleSubmit = (e) => {

    UplodePost();
    setImageBase64("")
  };
  React.useEffect(() => {
    fetchPostsData();
  }, [update]);

  return (
    <Card sx={{ marginBottom: "30px" }}>
      <CardContent>
        <Box>
          <Box>
            <Typography variant="h4">App Banners</Typography>
          </Box>

          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={2} md={2}>
                <Item>
                  <Box style={{ marginTop: 20 }}>
                  
                  
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                       
                  </Box>
                  <Box>
                    <Typography style={{color:"grey"}}>Image Size Must Be less than 324 KB</Typography>
                  </Box>
                </Item>
              </Grid>

{
  imageBase64 !== "" && <Grid item xs={2} sm={2} md={2}>
  <Item>
    <Box style={{ marginTop: -10 }}>
      {
        <Box style={{width:"60px",height:"60px"}}>
         <img style={{height:"100%",width:"100%"}} src={imageBase64} alt="Image Description"></img>
        </Box>
}
    </Box>
  </Item>
</Grid>
}
              

              <Grid item xs={2} sm={2} md={2}>
                <Item>
                  <Box
                    sx={{
                      padding: "7px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      size="large"
                      onClick={handleSubmit}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Box>

          <Box style={{ marginTop: "100px" }}>
            <Box style={{ marginTop: "40px" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                <Grid item xs={6} sm={6} md={6}>
                  <Item>
                    <Box style={{ marginTop: 10 }}>
                      <Typography>Banners</Typography>
                    </Box>
                  </Item>
                </Grid>

                <Grid item xs={6} sm={6} md={6}>
                  <Item>
                    <Box style={{ marginTop: 10 }}>
                      <Typography>Delete</Typography>
                    </Box>
                  </Item>
                </Grid>
              </Grid>
            </Box>
            {Posters.map((el, index) => {
              return (
                <Box style={{ marginTop: "40px" }}>
                  <Grid
                    key={index}
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
                    <Grid item xs={6} sm={6} md={6}>
                      <Item>
                        <Box
                          sx={{
                            padding: "7px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box style={{width:"60px",height:"60px"}}>
                      <img style={{height:"100%",width:"100%"}} src={el.image} alt="Image Description"></img>
                      </Box>
                        </Box>
                      </Item>
                    </Grid>

                    <Grid item xs={6} sm={6} md={6}>
                      <Item>
                        <Box
                          sx={{
                            padding: "7px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            size="large"
                            color="error"
                            variant="contained"
                            onClick={()=>handelDeletePost(el.bn_id)}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              );
            })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
