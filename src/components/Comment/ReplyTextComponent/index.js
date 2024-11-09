import { DivInput, ButtonSend } from './styles';
import { Input } from 'antd';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createCommentReply } from '../../../redux/action/comment/comment';
import { useDispatch } from 'react-redux';
import { CheckLoginContext } from '../../../contexts/LoginContext';
const { TextArea } = Input;

function ReplyTextComponent(props) {
  const [text, setText] = useState();

  const { userInfo } = useContext(CheckLoginContext);

  const { filmId } = useParams();
  const dispatch = useDispatch();

  const handleSendComment = async () => {
    if (text) {
      const data = {
        data: {
          userId: userInfo.userId,
          content: text,
          moviesId: filmId,
          parentCommentId: props.item._id,
          parentUserId: props.item.userId,
          rootCommentId: props.rootId,
        },
        userInfo: userInfo,
        parentUserId: props.item.userId,
      };
      await dispatch(createCommentReply(data));
      props.setOpen((prev) => ({
        ...prev,
        [props.item._id]: !prev[props.item._id],
      }));
    }
  };

  return (
    <DivInput>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write feedback"
      />
      <ButtonSend onClick={handleSendComment}>Gửi</ButtonSend>
    </DivInput>
  );
}

export default ReplyTextComponent;
