import React from 'react';
import { Crown, Shield, Zap, Star } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  position: string;
  experience: string;
  achievements: string[];
  image: string;
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Captain",
      position: "Batsman",
      experience: "8 years",
      achievements: ["BIT Mesra Alumni", "Leading run scorer 2023", "Best Captain Award"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Vice Captain",
      position: "All-rounder",
      experience: "6 years",
      achievements: ["BIT Mesra Alumni", "Player of the Year 2023", "Best Bowling Figures"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Wicket Keeper",
      position: "Batsman",
      experience: "7 years",
      achievements: ["BIT Mesra Alumni", "Most dismissals 2023", "Best Wicket Keeper"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "Bowler",
      position: "Fast Bowler",
      experience: "5 years",
      achievements: ["BIT Mesra Alumni", "Leading wicket taker", "Best Bowling Average"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Vikram Reddy",
      role: "Batsman",
      position: "Opening Batsman",
      experience: "9 years",
      achievements: ["BIT Mesra Alumni", "Highest individual score", "Most centuries"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Anita Joshi",
      role: "All-rounder",
      position: "Spin Bowler",
      experience: "4 years",
      achievements: ["BIT Mesra Alumni", "Best Economy Rate", "Most Catches"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face"
    }
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Captain': return <Crown className="role-icon" />;
      case 'Vice Captain': return <Shield className="role-icon" />;
      case 'Bowler': return <Zap className="role-icon" />;
      default: return <Star className="role-icon" />;
    }
  };

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Team</h2>
          <p className="section-subtitle">
            Meet the talented players who make our club great
          </p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
                <div className="team-role">
                  {getRoleIcon(member.role)}
                  <span>{member.role}</span>
                </div>
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-experience">{member.experience} experience</p>
                <div className="team-achievements">
                  {member.achievements.map((achievement, index) => (
                    <span key={index} className="achievement-tag">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
