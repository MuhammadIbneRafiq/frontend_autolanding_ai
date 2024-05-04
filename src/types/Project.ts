export enum ProjectStatus {
    not_started = "Not Started",
    in_progress = "In Progress",
    requires_assistance = "Requires Assistance",
    completed = "Completed",
}

export type Project = {
    project_id: string;
    conversation_id: string;
    user_id: string;
    freelancer_id: string;
    created_at: string;
    title: string;
    description: string;
    attachments_link: string;
    status: ProjectStatus;
};
