// src/api/api.ts
export const host_main = "https://mindmath.azurewebsites.net";

// Auth
export const API_REGISTER = "/api/auths/register";
export const API_LOGIN = "/api/auths/login";

// Chapters
export const API_CREATE_CHAPTER = (subjectId: string) => `/api/subjects/${subjectId}/chapters`;
export const API_GET_CHAPTERS = (subjectId: string) => `/api/subjects/${subjectId}/chapters`;
export const API_GET_ACTIVE_CHAPTERS = (subjectId: string) => `/api/subjects/${subjectId}/chapters/active`;
export const API_GET_CHAPTER_DETAIL = (subjectId: string, chapterId: string) => `/api/subjects/${subjectId}/chapters/${chapterId}`;
export const API_UPDATE_CHAPTER = (subjectId: string, chapterId: string) => `/api/subjects/${subjectId}/chapters/${chapterId}`;

// Input Parameters
export const API_CREATE_INPUT_PARAM = (problemTypeId: string, userId: string) => `/api/problem-types/${problemTypeId}/users/${userId}/input-parameters`;
export const API_GET_INPUT_PARAMS = (problemTypeId: string, userId: string) => `/api/problem-types/${problemTypeId}/users/${userId}/input-parameters`;
export const API_GET_INPUT_PARAM_DETAIL = (problemTypeId: string, userId: string, inputParameterId: string) => `/api/problem-types/${problemTypeId}/users/${userId}/input-parameters/${inputParameterId}`;
export const API_UPDATE_INPUT_PARAM = (problemTypeId: string, userId: string, inputParameterId: string) => `/api/problem-types/${problemTypeId}/users/${userId}/input-parameters/${inputParameterId}`;
export const API_GET_ACTIVE_INPUT_PARAMS = (problemTypeId: string, userId: string) => `/api/problem-types/${problemTypeId}/users/${userId}/input-parameters/active`;

// Problem Types
export const API_GET_PROBLEM_TYPES = (topicId: string) => `/api/topics/${topicId}/problem-types`;
export const API_CREATE_PROBLEM_TYPE = (topicId: string) => `/api/topics/${topicId}/problem-types`;
export const API_GET_ACTIVE_PROBLEM_TYPES = (topicId: string) => `/api/topics/${topicId}/problem-types/active`;
export const API_GET_PROBLEM_TYPE_DETAIL = (topicId: string, problemTypeId: string) => `/api/topics/${topicId}/problem-types/${problemTypeId}`;
export const API_UPDATE_PROBLEM_TYPE = (topicId: string, problemTypeId: string) => `/api/topics/${topicId}/problem-types/${problemTypeId}`;

// Solutions
export const API_GET_SOLUTION = (inputParameterId: string) => `/api/solutions/${inputParameterId}`;

// Subjects
export const API_CREATE_SUBJECT = "/api/subjects";
export const API_GET_SUBJECTS = "/api/subjects";
export const API_GET_SUBJECT_DETAIL = (subjectId: string) => `/api/subjects/${subjectId}`;
export const API_UPDATE_SUBJECT = (subjectId: string) => `/api/subjects/${subjectId}`;
export const API_GET_ACTIVE_SUBJECTS = "/api/subjects/active";

// Tokens
export const API_CREATE_TOKEN = "/api/tokens";

// Topics
export const API_CREATE_TOPIC = (chapterId: string) => `/api/chapters/${chapterId}/topics`;
export const API_GET_TOPICS = (chapterId: string) => `/api/chapters/${chapterId}/topics`;
export const API_GET_ACTIVE_TOPICS = (chapterId: string) => `/api/chapters/${chapterId}/topics/active`;
export const API_GET_TOPIC_DETAIL = (chapterId: string, topicId: string) => `/api/chapters/${chapterId}/topics/${topicId}`;
export const API_UPDATE_TOPIC = (chapterId: string, topicId: string) => `/api/chapters/${chapterId}/topics/${topicId}`;

// Transactions
export const API_GET_TRANSACTIONS = "/api/transactions";
export const API_GET_USER_TRANSACTIONS = (userId: string) => `/api/transactions/${userId}`;

// Users
export const API_GET_USERS = "/api/users";
export const API_GET_USER_DETAIL = (userId: string) => `/api/users/${userId}`;
export const API_UPDATE_USER = (userId: string) => `/api/users/${userId}`;
export const API_UPDATE_PASSWORD = (userId: string) => `/api/users/${userId}/password`;

// Wallets
export const API_GET_WALLET = (userId: string) => `/api/wallets/${userId}`;
