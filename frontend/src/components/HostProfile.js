// IMPORT DEPENDENCIES
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// IMPORT COMPONENTS
import profileAvatar from "./assets/profileAvatar.jpeg";
import { useParams } from "react-router";

//IMPORT LOADING
import { Loading } from "./Loading";

const HostProfile = (props) => {
    const { id } = useParams();

    const [host, setHost] = useState(null);
    const [hostsLoaded, setHostsLoaded] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [sendingComment, setSendingComment] = useState(false);

    useEffect(() => {
        fetchHost();
    }, [id]);

    function fetchHost() {
        setHostsLoaded(false);
        fetch(`/host/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setHost(data.data[0]);
                setHostsLoaded(true);
            });
    }

    function sendComment() {
        setSendingComment(true);
        fetch(`/host/${id}/comments`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: commentValue,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setCommentValue("");
                    fetchHost();
                }
                setSendingComment(false);
            });
    }

    if (!host) {
        return <Loading />;
    }

    return (
        <Wrapper>
            <div>
                <Container>
                    <div>
                        <Image src={profileAvatar}></Image>
                    </div>
                    <div>
                        <FullName>
                            <Name>{host.name}</Name>
                            <Surname>{host.surname}</Surname>
                        </FullName>

                        <City>{host.city}</City>
                    </div>
                </Container>

                <CommentsWrapper>
                    <CommentsTitle>Comments</CommentsTitle>
                    <CommentsList>
                        {host.comments &&
                            host.comments.map((comment) => (
                                <CommentWrapper>
                                    <span>
                                        <b>
                                            {comment.author
                                                ? comment.author.name
                                                : "Unknown author"}
                                        </b>
                                        (
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleDateString()}
                                        )
                                    </span>
                                    <span>Message: {comment.text}</span>
                                </CommentWrapper>
                            ))}
                    </CommentsList>

                    <CommentsInputWrapper>
                        {sendingComment ? (
                            <Loading />
                        ) : (
                            <>
                                <input
                                    onChange={(e) =>
                                        setCommentValue(e.target.value)
                                    }
                                    value={commentValue}
                                />
                                <button onClick={sendComment}>Send</button>
                            </>
                        )}
                    </CommentsInputWrapper>
                </CommentsWrapper>
            </div>
        </Wrapper>
    );
};

export default HostProfile;

const Wrapper = styled.div`
    padding: var(--padding-page);
`;

const Container = styled.div`
    display: flex;
`;

const Image = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 80px;
`;

const FullName = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Name = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
`;
const Surname = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 22px;
    margin-left: 5px;
`;

const City = styled.div`
    margin: 10px 0px 0px 50px;
    font-size: 18px;
    font-style: italic;
`;

const CommentsWrapper = styled.div``;

const CommentsList = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentsInputWrapper = styled.div`
    margin-top: 20px;
`;

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

const CommentsTitle = styled.div`
    font-size: 30px;
`;
