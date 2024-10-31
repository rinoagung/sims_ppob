// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        profile_image: '/profile.png',
    });

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data.data);
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCloseButton: true,
                html: `<div class='text-center'>
                <p>Profile berhasil di update</p>
            </div>`
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    const confirmSave = async () => {
        Swal.fire({
            html: `<div class='text-center'>
                <p>Anda yakin ingin melakukan update profil?</p>
            </div>`,
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Batalkan",
            confirmButtonColor: "#f42619",
            cancelButtonColor: "#7D8492",
        }).then(async (result) => {
            if (result.isConfirmed) {
                handleSave();
            } else {
                return;
            }
        });
    }

    const isValidImageUrl = (url) => {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
    };


    const handleFileChange = async (e) => {
        const token = localStorage.getItem('token');
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 100 * 1024; // 100 KB
        const inputFile = document.getElementById('file-upload')

        if (file) {
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    icon: "error",
                    showConfirmButton: false,
                    showCloseButton: true,
                    html: `<div class='text-center'>
                    <p>Please select a valid image (jpg, png).</p>
                </div>`
                });
                inputFile.value = '';
                return;
            }
            if (file.size > maxSize) {
                Swal.fire({
                    icon: "error",
                    showConfirmButton: false,
                    showCloseButton: true,
                    html: `<div class='text-center'>
                    <p>Ukuran foto profile harus di bawah 100 KB</p>
                </div>`
                });
                inputFile.value = '';
                return;
            }

            Swal.fire({
                html: `<div class='text-center'>
                    <p>Anda yakin ingin mengganti foto profil?</p>
                </div>`,
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Batalkan",
                confirmButtonColor: "#f42619",
                cancelButtonColor: "#7D8492",
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const formData = new FormData();
                    formData.append('file', file);

                    const response = await fetch(`${process.env.REACT_APP_API_URL}/profile/image`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    });

                    if (!response.ok) {
                        throw new Error('Failed to update image');
                    }

                    const data = await response.json();
                    Swal.fire({
                        icon: "success",
                        showConfirmButton: false,
                        showCloseButton: true,
                        html: `<div class='text-center'>
                        <p>Foto profile berhasil di update</p>
                    </div>`
                    });
                    fetchUserProfile();
                    setIsEditing(false);
                    inputFile.value = '';
                } else {
                    inputFile.value = '';
                    return;
                }
            });
        }
    };

    const profile_image_url = isValidImageUrl(user.profile_image) ? user.profile_image : '/logos/profile.png';

    return (
        <div className="container mt-5">
            <div>
                <div className='position-relative m-auto' style={{ width: "fit-content" }}>
                    <img
                        src={profile_image_url}
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: '150px', height: '150px' }}
                    />
                    <label role='button' htmlFor="file-upload" className="position-absolute" style={{ bottom: '10px', right: '10px' }}>
                        <i className="bi bi-pencil-fill border border-1 border-black" style={{ fontSize: '16px', backgroundColor: 'white', padding: '5px 7.5px', borderRadius: '50%' }}></i>
                        <form action={`${process.env.REACT_APP_API_URL}/profile/update`} method="put">
                            <input
                                name='foto_profile'
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </form>
                    </label>
                </div>
                <h1 className='text-center mt-3'>{user.first_name} {user.last_name}</h1>

            </div>
            <form className="mt-4 row">
                <div className="mb-3 col-lg-8 col-sm-10 col-12 m-auto">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="mb-3 col-lg-8 col-sm-10 col-12 m-auto">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            id="first_name"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="mb-3 col-lg-8 col-sm-10 col-12 m-auto">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <div className='input-group'>
                        <span className="input-group-text" id="basic-addon1"><i className="bi bi-person"></i></span>
                        <input
                            type="text"
                            className="form-control"
                            id="last_name"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between flex-column col-lg-8 col-sm-10 col-12 m-auto">
                    {isEditing ? (
                        <>
                            <button type="button" className="btn btn-danger mb-3" onClick={confirmSave}>Simpan</button>
                            <button type="button" className="btn btn-outline-danger" onClick={handleEditToggle}>Batal</button>
                        </>
                    ) : (
                        <>
                            <button type="button" className="btn btn-outline-danger mb-3" onClick={handleEditToggle}>Edit Profile</button>
                            <button type="button" className="btn btn-danger" onClick={() => {
                                localStorage.removeItem('token');
                                navigate('/');
                            }}>Logout</button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
