package com.productivity.dto;

import com.productivity.model.Task;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Task.Priority priority;
    private LocalDateTime deadline;
    private Task.TaskStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
}
