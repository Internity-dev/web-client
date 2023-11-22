import React, { createRef, useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { InputText, LoginBtn, SkillsInput } from "../../components";
import axiosClient from "../../axios-client";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ChangeProfile = () => {
  const { user, setUser } = useStateContext();
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
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [address, setAddress] = useState(user.address || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [gender, setGender] = useState(user.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth || "");
  const [bio, setBio] = useState(user.bio || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const selectedTags = (tags) => {
    console.log(tags);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      gender: genderRef.current.value,
      date_of_birth: dateOfBirthRef.current.value,
      bio: bioRef.current.value,
      skills: skillsRef.current.value,
    };

    axiosClient
      .put("/change-profile", payload)
      .then(({ data }) => {
        setUser(data.user);

        if (imageInputRef.current.files[0]) {
          const payload = {
            avatar: imageInputRef.current.files[0]
          };

          axiosClient
            .post("/avatars", payload, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(({ data }) => {
              setUser(data.user.avatar);
              setUser(data.user.avatar_url);
            })
            .catch((err) => {
              const response = err.response;
              if (
                response &&
                (response.status === 401 || response.status === 422)
              ) {
                setError(response.data.message);
              }
            });
        }
        setMessage("Profil berhasil diubah");
      })
      .catch((err) => {
        const response = err.response;
        if (response && (response.status === 401 || response.status === 422)) {
          setError(response.data.message);
        }
      });
  };

  useEffect(() => {
    if (message) {
      const timeoutId = setTimeout(() => {
        navigate("/profile");
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [message, navigate]);

  return (
    <div className='m-2 md:m-10 mt-24 shadow-xl transition duration-300 dark:bg-secondary-dark-bg bg-white rounded-3xl'>
      <form onSubmit={onSubmit} encType='multipart/form-data'>
        <div className='w-full flex flex-col'>
          <div className='my-10 flex flex-col justify-center items-center'>
            <div className='relative'>
              <img
                src={selectedImage ? selectedImage : user.avatar_url}
                className='rounded-full w-36 h-36 min-w-full min-h-full max-w-36 max-h-36 object-fill'
              />
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
            {message && (
              <div
                role='alert'
                className='alert alert-success fixed w-auto top-16 right-10'
              >
                <Icon icon='icon-park-solid:success' width={30} />
                <span>{message}</span>
              </div>
            )}
            {error && (
              <div
                role='alert'
                className='alert alert-error fixed w-auto top-16 right-10'
              >
                <Icon icon='mingcute:alert-fill' width={30} />
                <span>{error}</span>
              </div>
            )}
            <InputText
              label='Nama'
              name='name'
              type='text'
              innerRef={nameRef}
              placeholder={user.name ? user.name : "Masukkan Nama"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <InputText
              label='Email'
              name='email'
              type='email'
              innerRef={emailRef}
              placeholder={user.email ? user.email : "Masukkan Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputText
              label='Alamat'
              name='address'
              type='text'
              innerRef={addressRef}
              placeholder={user.address ? user.address : "Masukkan Alamat"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <InputText
              label='Nomor Telepon'
              name='phone'
              type='text'
              innerRef={phoneRef}
              placeholder={user.phone ? user.phone : "Masukkan Nomor Telepon"}
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
                <option disabled defaultValue>
                  Pilih jenis kelamin anda
                </option>
                <option value='male'>Laki-Laki</option>
                <option value='female'>Perempuan</option>
              </select>
            </div>

            <div className='form-control my-2'>
              <label className='label'>
                <span className='label-text text-dark transition duration-300 dark:text-lightOne text-base'>
                  Tanggal Lahir
                </span>
              </label>
              <input
                type='date'
                name='date_of_birth'
                className='input input-bordered bg-main-bg transition duration-300 dark:bg-main-dark-bg text-base'
                ref={dateOfBirthRef}
                placeholder={
                  user.date_of_birth ? user.date_of_birth : "17/09/2006"
                }
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

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
                placeholder={user.bio ? user.bio : "Masukkan Bio"}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            {/* <SkillsInput
              name='skills'
              innerRef={skillsRef}
              selectedTags={selectedTags}
              tags={user.skills}
            /> */}
            <InputText
              label='Skills'
              name='skills'
              type='text'
              innerRef={skillsRef}
              placeholder={user.skills ? user.skills : "Masukkan Skills"}
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
