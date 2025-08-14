import React, { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave, FaKey } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { userApi, authApi } from '../../api/api'
import type { updateUser, User } from '../../types/user'
import './ProfileScreen.css'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<updateUser>({
    userName: '',
    avatar: null
  })
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [loading, setLoading] = useState({
    profile: false,
    password: false
  })
  const [errors, setErrors] = useState({
    profile: '',
    password: ''
  })
  const [success, setSuccess] = useState({
    profile: '',
    password: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authApi.getProfile()
        const userData = response.data as User
        setUser({
          userName: userData.userName,
          avatar: userData.avatar
        })
        if (userData.avatar) {
          setPreviewAvatar(userData.avatar)
        }
      } catch (error) {
        console.error('Failed to fetch profile', error)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [navigate])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setUser(prev => ({ ...prev, avatar: file }))
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(prev => ({ ...prev, profile: '' }))
    setSuccess(prev => ({ ...prev, profile: '' }))

    if (!user.userName) {
      setErrors(prev => ({ ...prev, profile: 'Username is required' }))
      return
    }

    try {
      setLoading(prev => ({ ...prev, profile: true }))
      
      const formData = new FormData()
      formData.append('userName', user.userName)
      if (user.avatar instanceof File) {
        formData.append('avatar', user.avatar)
      }

      await userApi.updateCurrentUser(formData)
      setSuccess(prev => ({ ...prev, profile: 'Profile updated successfully!' }))
      setIsEditingInfo(false)
      window.location.reload()
    } catch (error) {
      console.error('Profile update error:', error)
      setErrors(prev => ({ ...prev, profile: 'Failed to update profile' }))
    } finally {
      setLoading(prev => ({ ...prev, profile: false }))
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors(prev => ({ ...prev, password: '' }))
    setSuccess(prev => ({ ...prev, password: '' }))

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors(prev => ({ ...prev, password: 'Passwords do not match' }))
      return
    }

    if (passwordData.newPassword.length < 6) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }))
      return
    }

    try {
      setLoading(prev => ({ ...prev, password: true }))
      
      await authApi.changePass(
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      )
      
      setSuccess(prev => ({ ...prev, password: 'Password changed successfully!' }))
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setIsEditingPassword(false)
    } catch (error) {
      console.error('Password change error:', error)
      setErrors(prev => ({ ...prev, password: 'Failed to change password' }))
    } finally {
      setLoading(prev => ({ ...prev, password: false }))
    }
  }

  const toggleEditInfo = () => {
    setIsEditingInfo(!isEditingInfo)
    if (!isEditingInfo) {
      setErrors(prev => ({ ...prev, profile: '' }))
      setSuccess(prev => ({ ...prev, profile: '' }))
    } else {
      // Reset to original values when canceling
      authApi.getProfile().then(response => {
        const userData = response.data as User
        setUser({
          userName: userData.userName,
          avatar: userData.avatar
        })
        setPreviewAvatar(userData.avatar || null)
      })
    }
  }

  const toggleEditPassword = () => {
    setIsEditingPassword(!isEditingPassword)
    if (!isEditingPassword) {
      setErrors(prev => ({ ...prev, password: '' }))
      setSuccess(prev => ({ ...prev, password: '' }))
    } else {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h2>My Profile</h2>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h3>Profile Information</h3>
            <button 
              onClick={toggleEditInfo}
              className={`edit-button ${isEditingInfo ? 'cancel-button' : ''}`}
              disabled={loading.profile}
            >
              {loading.profile ? 'Saving...' : isEditingInfo ? 'Cancel' : 'Edit Info'}
            </button>
          </div>

          {errors.profile && <div className="error-message">{errors.profile}</div>}
          {success.profile && <div className="success-message">{success.profile}</div>}

          <form onSubmit={handleProfileSubmit}>
            <div className="avatar-upload">
              <div className="avatar-preview">
                {previewAvatar ? (
                  <img src={previewAvatar} alt="Avatar" />
                ) : (
                  <div className="avatar-placeholder_profile">
                    {user.userName.charAt(0).toUpperCase()}
                  </div>
                )}
                {isEditingInfo && (
                  <label className="avatar-edit">
                    <FaCamera />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleAvatarChange} 
                      hidden 
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label><FaUser /> Username</label>
              <input
                type="text"
                value={user.userName}
                onChange={(e) => setUser(prev => ({ ...prev, userName: e.target.value }))}
                className="form-input"
                disabled={!isEditingInfo}
                required
              />
            </div>

            {isEditingInfo && (
              <button type="submit" className="save-button" disabled={loading.profile}>
                <FaSave /> {loading.profile ? 'Saving...' : 'Save Profile'}
              </button>
            )}
          </form>
        </div>

        <div className="profile-section password-section">
          <div className="section-header">
            <h3>Password Settings</h3>
            <button 
              onClick={toggleEditPassword}
              className={`edit-button ${isEditingPassword ? 'cancel-button' : ''}`}
              disabled={loading.password}
            >
              {loading.password ? 'Saving...' : isEditingPassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {errors.password && <div className="error-message">{errors.password}</div>}
          {success.password && <div className="success-message">{success.password}</div>}

          {isEditingPassword && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label><FaLock /> Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="form-input"
                  placeholder="Enter current password"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaKey /> New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="form-input"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="form-group">
                <label><FaKey /> Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="form-input"
                  placeholder="Confirm new password"
                  required
                />
              </div>

              <button type="submit" className="save-button" disabled={loading.password}>
                <FaSave /> {loading.password ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile