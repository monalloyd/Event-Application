package com.monalloyd.backend.service.event;

import com.monalloyd.backend.model.Event;
import org.modelmapper.ModelMapper;

public class EventDTOMapper {
    private final ModelMapper modelMapper;

    public EventDTOMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Event dtoToEvent(EventDTO eventDTO) {
        return modelMapper.map(eventDTO, Event.class);
    }

    public EventDTO eventToDTO(Event event) {
        return modelMapper.map(event, EventDTO.class);
    }
}
