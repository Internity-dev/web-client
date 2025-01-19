import React, { createRef, useEffect, useState } from "react";
import { Alert, InputDate, InputText, LoginBtn } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const ChangeProfile = () => {
  const navigate = useNavigate();
  const { data: user , refetch: refetchUser } = useUser();

  const { mutate } = useMutation(
    (payload) => axiosClient.put("/change-profile", payload),
    {
      onSuccess: (response) => {
        setMessage(response.data.message);
        refetchUser();
      },
      onError: (err) => {
        const response = err.response;
        if (response && (response.status === 401 || response.status === 422)) {
          setError(response.data.message);
        }
      },
    }
  );

  const nameRef = createRef();
  const emailRef = createRef();
  const addressRef = createRef();
  const phoneRef = createRef();
  const genderRef = createRef();
  const dateOfBirthRef = createRef();
  const bioRef = createRef();
  const skillsRef = createRef();
  const imageInputRef = createRef();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setGender(user.gender || "male");
      setDateOfBirth(user.date_of_birth || "");
      setBio(user.bio || "");
      setSkills(user.skills || "");
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      name,
      email,
      address,
      phone,
      gender,
      date_of_birth: dateOfBirth,
      bio,
      skills,
    };

    try {
      await mutate(payload);

      if (imageInputRef.current.files[0]) {
        const formData = new FormData();
        formData.append("avatar", imageInputRef.current.files[0]);

        await axiosClient.post("/avatars", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
    } catch (err) {
      const response = err.response;
      if (response && (response.status === 401 || response.status === 422)) {
        setError(response.data.message);
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        navigate("/profile");
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [message, navigate]);

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='w-full flex flex-col'>
          <div className='my-10 flex flex-col justify-center items-center'>
            <div className='relative'>
              <div className='avatar static'>
                <div className='w-36 rounded-full'>
                  <img
                    src={selectedImage ? selectedImage : user?.avatar_url}
                    className='rounded-full w-36 h-36 min-w-full min-h-full max-w-36 max-h-36 object-fill'
                  />
                </div>
              </div>
              <div className='absolute bottom-0 right-0 flex justify-center items-center bg-main overflow-hidden rounded-full w-11 h-11'>
                <input
                  type='file'
                  name='avatar'
                  accept='image/*'
                  onChange={handleImageChange}
                  ref={imageInputRef}
                  className='absolute opacity-0 transform scale-150 cursor-pointer'
                />
                <Icon
                  icon='mdi:camera-enhance'
                  className='text-lightOne'
                  width={30}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='mx-10 my-5'>
            {message && <Alert text={message} />}
            {error && <Alert text={error} error />}
            <InputText
              label='Nama'
              name='name'
              type='text'
              innerRef={nameRef}
              placeholder={user?.name ? user.name : "Masukkan Nama"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputText
              label='Email'
              name='email'
              type='email'
              innerRef={emailRef}
              placeholder={user?.email ? user.email : "Masukkan Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputText
              label='Alamat'
              name='address'
              type='text'
              innerRef={addressRef}
              placeholder={user?.address ? user.address : "Masukkan Alamat"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <InputText
              label='Nomor Telepon'
              name='phone'
              type='text'
              innerRef={phoneRef}
              placeholder={user?.phone ? user.phone : "Masukkan Nomor Telepon"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className='form-control w-full my-2'>
              <label className='label'>
                <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                  Jenis Kelamin
                </span>
              </label>
              <select
                name='gender'
                ref={genderRef}
                className='select select-bordered bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled>Pilih jenis kelamin anda</option>
                <option value='male'>Laki-Laki</option>
                <option value='female'>Perempuan</option>
              </select>
            </div>
            <InputDate
              label='Tanggal Lahir'
              name='date_of_birth'
              innerRef={dateOfBirthRef}
              placeholder={
                user?.date_of_birth ? user.date_of_birth : "17/09/2006"
              }
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                  Tentang Saya
                </span>
              </label>
              <textarea
                name='bio'
                className='textarea textarea-bordered h-24 bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
                ref={bioRef}
                placeholder={user?.bio ? user.bio : "Masukkan Bio"}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            <InputText
              label='Skills'
              name='skills'
              type='text'
              innerRef={skillsRef}
              placeholder={user?.skills ? user.skills : "Masukkan Skills"}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <LoginBtn text='Save' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeProfile;
