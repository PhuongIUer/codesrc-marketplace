import React, { useState, useEffect } from 'react'
import './Team.css'

const Team = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading seller profiles
    setTimeout(() => {
      setTeam([
        {
          id: 1,
          name: "Nguyen Hoang Ly",
          role: "Member",
          expertise: "---",
          email: "---"
        },
        {
          id: 2,
          name: "Trân Minh Phương",
          role: "Member",
          expertise: "---",
          email: ""
        },
        {
          id: 3,
          name: "Nguyễn Trần Trung Kỳ",
          role: "Member",
          expertise: "",
          email: ""
        }
      ])
      setLoading(false)
    }, 600)
  }, [])

  return (
  <section id="team" className="team">
      <div className="container">
    <h2>Featured Sellers</h2>
        
        {loading ? (
          <div className="loading">Loading team members...</div>
        ) : (
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-avatar">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3>{member.name}</h3>
                <div className="member-role">{member.role}</div>
                <p className="member-expertise">{member.expertise}</p>
                <a href={`mailto:${member.email}`} className="member-email">
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Team
