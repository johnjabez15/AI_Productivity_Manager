package com.productivity.service;

import com.productivity.dto.ChatResponse;
import com.productivity.model.Task;
import com.productivity.repository.TaskRepository;
import com.productivity.repository.UserRepository;
import com.productivity.model.User;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.completion.chat.ChatMessageRole;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class AIService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ChatResponse chat(String userMessage) {
        try {
            OpenAiService service = new OpenAiService(apiKey, Duration.ofSeconds(30));

            List<ChatMessage> messages = new ArrayList<>();

            // System prompt for motivation and productivity
            ChatMessage systemMessage = new ChatMessage(
                ChatMessageRole.SYSTEM.value(),
                "You are a friendly and motivating productivity assistant. " +
                "Your role is to help users stay motivated, manage their tasks effectively, " +
                "and provide encouragement to complete their work. " +
                "Be positive, supportive, and provide actionable advice."
            );
            messages.add(systemMessage);

            // User message
            ChatMessage userMsg = new ChatMessage(ChatMessageRole.USER.value(), userMessage);
            messages.add(userMsg);

            ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                    .model(model)
                    .messages(messages)
                    .maxTokens(500)
                    .temperature(0.7)
                    .build();

            String response = service.createChatCompletion(completionRequest)
                    .getChoices().get(0).getMessage().getContent();

            return new ChatResponse(response);

        } catch (Exception e) {
            return new ChatResponse("I'm here to help! However, I'm having trouble connecting right now. " +
                    "Keep up the great work on your tasks!");
        }
    }

    public List<Task> scheduleTasks() {
        User user = getCurrentUser();
        List<Task> tasks = taskRepository.findByUserOrderByDeadlineAsc(user);

        // Sort by priority and deadline
        tasks.sort((t1, t2) -> {
            int priorityCompare = Integer.compare(
                t2.getPriority().ordinal(), 
                t1.getPriority().ordinal()
            );
            if (priorityCompare != 0) return priorityCompare;

            if (t1.getDeadline() == null) return 1;
            if (t2.getDeadline() == null) return -1;
            return t1.getDeadline().compareTo(t2.getDeadline());
        });

        return tasks;
    }
}
