import { useContext, useEffect, useState } from 'react';
import {
  DivDetailComment,
  NameUser,
  ContentUser,
  RowComment,
  DivContent,
  ColLeftComment,
  ColRightComment,
  AvatarUserComment,
  DivAction,
  ReplyButton,
  DivActionComment,
  DivContainerAction,
  ButtonComment,
  DivInput,
  DivUpdate,
  ButtonSend,
  DivRightComment,
  TextTime,
  DivActionUpdate,
  DivLeft,
} from './styles';
import { Dropdown, Space, Col, Menu, Input, Button } from 'antd';
import { MessageFilled, EllipsisOutlined } from '@ant-design/icons';
import ReplyTextComponent from '../ReplyTextComponent';
import { CheckLoginContext } from '../../../contexts/LoginContext';
const { TextArea } = Input;

function ListCommentComponent({
  item,
  open,
  setOpen,
  handleOpenReply,
  handleClickAction,
  input,
  setInput,
  updateCommentClick,
}) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(item.content);
  }, [item.content]);

  const { userInfo } = useContext(CheckLoginContext);

  function timeAgo() {
    const now = new Date();
    const commentDate = new Date(item.createAt);
    const diff = Math.abs(now - commentDate);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }

  const handleUpdateComment = (id) => {
    updateCommentClick(value, id);
  };
  const handleCancelComment = (id) => {
    setInput((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <DivDetailComment className="detail-comment">
      <RowComment>
        <ColLeftComment>
          <AvatarUserComment src={item.userId.avatarUser.url} />
        </ColLeftComment>
        <ColRightComment>
          <DivRightComment>
            {input[item._id] ? (
              <DivInput>
                <TextArea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <DivUpdate>
                  <ButtonSend onClick={() => handleUpdateComment(item._id)}>
                    Update
                  </ButtonSend>
                  <ButtonSend onClick={() => handleCancelComment(item._id)}>
                    Cancel
                  </ButtonSend>
                </DivUpdate>
              </DivInput>
            ) : (
              <>
                <DivContent>
                  <div>
                    <DivLeft>
                      <NameUser>
                        {item.userId.firstName} {item.userId.lastName}
                      </NameUser>
                      <ContentUser>{item.content}</ContentUser>
                    </DivLeft>
                    <DivActionUpdate>
                      {userInfo.userId === item.userId._id &&
                        !input[item._id] && (
                          <DivActionComment className="open-action-comment">
                            <Dropdown
                              overlay={
                                <Menu>
                                  <Menu.Item key="edit">
                                    <ButtonComment
                                      onClick={() =>
                                        handleClickAction('UPDATE', item._id)
                                      }>
                                      Edit
                                    </ButtonComment>
                                  </Menu.Item>
                                  <Menu.Item key="delete">
                                    <ButtonComment
                                      onClick={() =>
                                        handleClickAction('DELETE', item._id)
                                      }>
                                      Delete
                                    </ButtonComment>
                                  </Menu.Item>
                                </Menu>
                              }
                              placement="bottomRight">
                              <Space>
                                <EllipsisOutlined />
                              </Space>
                            </Dropdown>
                          </DivActionComment>
                        )}
                    </DivActionUpdate>
                  </div>
                </DivContent>
                <DivAction>
                  <DivContainerAction>
                    <TextTime>{timeAgo()}</TextTime>
                    <ReplyButton onClick={() => handleOpenReply(item._id)}>
                      <MessageFilled />
                      <p>Reply</p>
                    </ReplyButton>
                  </DivContainerAction>
                </DivAction>
              </>
            )}
          </DivRightComment>
          {open[item._id] && (
            <ReplyTextComponent
              item={item}
              rootId={item._id}
              setOpen={setOpen}
            />
          )}
        </ColRightComment>
      </RowComment>
    </DivDetailComment>
  );
}

export default ListCommentComponent;
