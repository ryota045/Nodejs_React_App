import styled, {css} from "styled-components";

const TournamentCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  margin: 4%;
  padding: 15px;
`;

const TournamentImage = styled.img`
${(props) => (
  props.isMobileView ?
  `width: 90px;
  height: 90px;` :
  `width: 125px;
  height: 125px;`
)}

  border-radius: 15px;
  margin-right: 15px;
`;

const TournamentInfo = styled.div`
  display: flex;
  margin-left:5px;
  flex-direction: column;
  align-self: center;
  text-align: left; 
`;

const TournamentName = styled.h3`
  margin: 0;
  font-size:${props => (props.isMobileView ?`14px` :`20px`)};
  color: #333;
`;

const TournamentDetails = styled.p`
  margin: 0;
  font-size: ${props => (
    props.isMobileView ? 
    `13px` : `18px`
  )};
  color: #666;
`;

const TournamentLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: ${props => (
    props.isMobileView ? 
    `13px` : `18px`
  )};
  &:hover {
    color: #0056b3;
  }
`;

const noImageLink = "https://1.bp.blogspot.com/-D2I7Z7-HLGU/Xlyf7OYUi8I/AAAAAAABXq4/jZ0035aDGiE5dP3WiYhlSqhhMgGy8p7zACNcBGAsYHQ/s1600/no_image_square.jpg";

const TournamentItem = ({ tournament, isMobileView }) => {
  const imageUrl = tournament.images[0] != null ? tournament.images[0].url : noImageLink;
  return (
    <TournamentCard>
      <TournamentImage isMobileView={isMobileView} src={imageUrl} alt="" />
      <TournamentInfo>
        <TournamentName isMobileView={isMobileView}>{tournament.name}</TournamentName>
        <TournamentDetails isMobileView={isMobileView}>Location: {tournament.addrState}</TournamentDetails>
        <TournamentDetails isMobileView={isMobileView}>
          Participants: {tournament.numAttendees}
        </TournamentDetails>
        <TournamentLink isMobileView={isMobileView} href={tournament.url}>Tournament Link</TournamentLink>
      </TournamentInfo>
    </TournamentCard>
  );
};

export default TournamentItem;
