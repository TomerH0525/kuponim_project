import "./AddCoupon.css";
import { useEffect, useState } from "react";
import companyService from "../../../Services/CompanyService";
import { Box, Button, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Coupon from "../../../Models/Coupon";
import errorHandler from "../../../Services/ErrorHandler";
import { authStore, logout } from "../../../Redux/AuthStore";
import { readAndCompressImage } from "browser-image-resizer";
import { useNavigate } from "react-router-dom";
import Category from "../../../Models/Category";

function AddCoupon(): JSX.Element {

  const navigate = useNavigate();

  const convertToBase64 = (blob: Blob) => {
    return new Promise(resolve => {
      var reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };

  const configResizeImage = {
    quality: 1,
    maxWidth: 640,
    maxHeight: 480,
    debug: true
  };

  async function sendCoupon(coupon: Coupon) {

    if ((coupon.image as FileList).length > 0) {
      console.log(coupon.image);
      let image = await readAndCompressImage((coupon.image as FileList)[0],configResizeImage);
      coupon.image = await convertToBase64(image);
    } else {
      coupon.image = "";
    }
    console.log("blah blah");
    companyService.addCoupon(coupon)
      .then((couponId) => {console.log(couponId);navigate("/");})
      .catch(err => {
        errorHandler.showError(err);
        if (err.response && err.response.status == "401") {
          authStore.dispatch(logout());
          navigate("/login");
          console.log("expired token or not recognized");
        }
      })
  }


  const { register, handleSubmit } = useForm<Coupon>();



  return (
    <div className="AddCoupon">
      <Box sx={{ display: "flex", justifyContent: "center", marginTop:"5%"}}>
        <Box sx={{ backgroundColor: "rgb(255, 253, 231, 0.5)", height: "60%", width: "35%", minWidth: 550, minHeight: 350, overflow: "auto" }}>
          <h2>Add Coupon</h2>
          <form onSubmit={handleSubmit(sendCoupon)} className="AddCustomerForm" >

            <TextField
              sx={{ width: "60%", maxWidth:{md:"50%"} }}
              label="Title"
              id="title"
              {...register("title")}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />

            <TextField
              sx={{ width: "80%", minWidth: "200px", maxWidth:{md:"80%"}}}
              label="Description"
              id="description"
              minRows={5}
              multiline={true}
              maxRows={20}
              {...register("description")}
              InputProps={{
                startAdornment: <InputAdornment position="start"></InputAdornment>,
              }}
            />

            <div className="inputNumberDiv">

              <TextField
                sx={{ width: "32%" }}
                label="Amount"
                id="amount"
                type="number"
                {...register("amount")}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />

              <TextField
                sx={{ width: "32%" }}
                type="number"
                label="Price"
                id="price"
                {...register("price")}
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
              />

            </div>

            <div className="DateDiv">
              <TextField

                sx={{ width: "35%", minWidth: "150px" }}
                type="date"
                id="startDate"
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                label="startDate"
                {...register("startDate")}
              />

              <TextField
                sx={{ width: "34%", minWidth: "150px" }}
                type="date"
                InputProps={{
                  startAdornment: <InputAdornment position="start"></InputAdornment>,
                }}
                id="endDate"
                label="endDate"
                {...register("endDate")}
              />
            </div>
            <InputLabel id="CategoryLabel">Category</InputLabel>
            <Select
              labelId="CategoryLabel"
              defaultValue={Category.VACATION}
              id="CategorySelect"
              name="category"
              {...register("category")}
            >
              {Object.keys(Category)
                .filter(key => isNaN(Number(key)))
                .map(key => <MenuItem {...register("category")} key={key} value={Category[key as unknown as number]}>{key}</MenuItem>)}

            </Select>
            <InputLabel htmlFor="image">Coupon Image</InputLabel>
            <Input id="image" type="file" sx={{ width: "35%", minWidth: "220px" }} {...register("image")} />


            <Button type="submit" size="large">Submit</Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}

export default AddCoupon;
