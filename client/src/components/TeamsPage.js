import React, { useState, useEffect } from 'react';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    // Placeholder teams data
    const teamsData = [
      { id: 1, name: 'Soccer Squad' },
      { id: 2, name: 'Gym Buddies' },
      { id: 3, name: 'Fitness Freaks' },
      // ...fetch more teams
    ];
    setTeams(teamsData);
  };

  const handleAddTeam = () => {
    // Logic to add a new team
    console.log('Add new team functionality goes here.');
    // This would typically involve setting a state to open a modal or navigate to a different route.
  };

  return (
    <div className="teams-page">
      <header className="teams-header">
        <h1>Your Teams</h1>
      </header>
      <ul className="teams-list">
        {teams.map((team) => (
          <li key={team.id} className="team-item">
            {team.name}
          </li>
        ))}
      </ul>
      {/* Additional functionality such as a modal or form to add a new team would go here */}
    </div>
  );
};

export default TeamsPage;

// The accompanying CSS could look something like this:
/*
.teams-page {
  padding: 20px;
}

.teams-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-team-icon {
  cursor: pointer;
  font-size: 24px;
}

.teams-list {
  list-style: none;
  padding: 0;
}

.team-item {
  background-color: #f0f0f0;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
}
*/
