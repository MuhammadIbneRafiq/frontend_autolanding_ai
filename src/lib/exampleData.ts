import { Project, ProjectStatus } from "@/types/Project";

import { Chat } from "@/types/Chat";
import { Message } from "@/types/Message";

export const mockChatList = [
    {
        chat_id: "example-chat-id-1",
        user_id: "example-user-id-1",
        title: "Looking for marketing help",
        created_at: "2021-08-01T19:00:00.000Z",
    },
] as Chat[];

export const mockChat = [
    {
        message_id: "example-message-id-1",
        content:
            "Hello, I'm looking for a freelancer to edit a video of a company retreat",
        created_at: "2021-08-01T19:00:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-2",
        content:
            "Sure, I'd be happy to assist you with that. Can you please provide more details about the video? What specific edits do you need?",
        created_at: "2021-08-01T19:01:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-3",
        content:
            "I need someone to edit out some background noise, add subtitles, and include our company logo at the beginning and end.",
        created_at: "2021-08-01T19:02:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-4",
        content:
            "Great! Could you specify the duration of the video and if there are any particular style preferences you have in mind?",
        created_at: "2021-08-01T19:03:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-5",
        content:
            "The video is about 20 minutes long, and as for style, something professional and modern would be ideal.",
        created_at: "2021-08-01T19:04:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-6",
        content:
            "Understood. Do you have a deadline for when you need the edited video?",
        created_at: "2021-08-01T19:05:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-7",
        content:
            "Yes, we'd like to have it ready for our next company presentation in three weeks.",
        created_at: "2021-08-01T19:06:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-8",
        content:
            "Thank you for providing all the details. Before we proceed, could you please provide a link where freelancers can access the video footage and any other necessary materials?",
        created_at: "2021-08-01T19:07:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-10",
        content:
            "Here is the link to the video footage: https://drive.google.com/drive/folders/EX123MPL314E&usp=sharing",
        created_at: "2021-08-01T19:09:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-11",
        content:
            "Thank you for providing the link. Before we proceed, could you please provide an estimated budget for the project?",
        created_at: "2021-08-01T19:10:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-12",
        content:
            "We're looking to stay within a budget of $500 for this project.",
        created_at: "2021-08-01T19:11:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "user",
        user_id: "example-user-id-1",
    },
    {
        message_id: "example-message-id-13",
        content:
            "Thank you for providing the budget. Based on the details you've provided, I will find a freelancer who can meet your requirements within your budget. I will now create the project for you.",
        created_at: "2021-08-01T19:12:00.000Z",
        chat_id: "example-chat-id-1",
        sender: "assistant",
        user_id: "example-user-id-1",
    },
] as Message[];

export const mockProjectList = [
    {
        project_id: "example-project-id-1",
        chat_id: "example-chat-id-1",
        user_id: "example-user-id-1",
        title: "Video Editing for Company Retreat",
        description:
            "Edit a 20-minute video of a company retreat. Add subtitles, remove background noise, and include company logo.",
        attachments_link:
            "https://drive.google.com/drive/folders/EX123MPL314E&usp=sharing",
        status: ProjectStatus.not_started,
        created_at: "2021-08-01T19:12:00.000Z",
    },
] as Project[];

export const mockProject = {
    project_id: "example-project-id-1",
    chat_id: "example-chat-id-1",
    user_id: "example-user-id-1",
    title: "Video Editing for Company Retreat",
    description:
        "Edit a 20-minute video of a company retreat. Add subtitles, remove background noise, and include company logo.",
    attachments_link:
        "https://drive.google.com/drive/folders/EX123MPL314E&usp=sharing",
    status: ProjectStatus.not_started,
    created_at: "2021-08-01T19:12:00.000Z",
} as Project;

export default {
    mockChatList,
    mockChat,
    mockProjectList,
    mockProject,
};
