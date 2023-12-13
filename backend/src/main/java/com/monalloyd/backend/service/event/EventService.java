package com.monalloyd.backend.service.event;

import com.monalloyd.backend.model.*;
import com.monalloyd.backend.repository.EventRepository;
import com.monalloyd.backend.repository.LocationRepository;
import com.monalloyd.backend.repository.UserRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final LocationRepository locationRepository;
    private final UserRepository userRepository;
    private final EventDTOMapper eventDTOMapper;
    private final EventAuthenticator eventAuthenticator;

    public EventService(EventRepository eventRepository, LocationRepository locationRepository, UserRepository userRepository, EventDTOMapper eventDTOMapper, EventAuthenticator eventAuthenticator) {
        this.eventRepository = eventRepository;
        this.locationRepository = locationRepository;
        this.userRepository = userRepository;
        this.eventDTOMapper = eventDTOMapper;
        this.eventAuthenticator = eventAuthenticator;
    }

    public Page<EventDTO> findAll(Pageable pageable) {
        Page<Event> events = eventRepository.findAll(pageable);
        return events.map(eventDTOMapper::eventToDTO);
    }

    public Optional<EventDTO> findOneById(Long id) {
        Optional<Event> oEvent = eventRepository.findById(id);
        if (oEvent.isPresent()) {
            Event event = oEvent.get();
            EventDTO dto = eventDTOMapper.eventToDTO(event);
            return Optional.of(dto);
        }
        return Optional.empty();
    }

    public Page<EventDTO> findByOptionalFilters(
            EventType eventType, LocalDateTime start, LocalDateTime end, String venue,
            String street, String zipcode, String state, String city, String country, Pageable pageable) {
        Page<Event> events = eventRepository.findByOptionalFilters(
                eventType, start, end, venue, street, zipcode, state, city, country, pageable);
        return events.map(eventDTOMapper::eventToDTO);
    }

    public List<String> findAllEventTypes() {
        return Arrays.stream(EventType.values())
                .map(Enum::name)
                .collect(Collectors.toList());
    }

    public EventDTO save(EventDTO eventDTO) {
        Event event = getEvent(eventDTO);
        setUser(eventDTO, event);
        Event createdEvent = eventRepository.save(event);
        return eventDTOMapper.eventToDTO(createdEvent);
    }

    private void setUser(EventDTO eventDTO, Event event) {
        User user = userRepository.findById(Long.parseLong(eventDTO.getUserId())).get();
        event.setUser(user);
    }

    private Event getEvent(EventDTO eventDTO) {
        try {
            Location savedLocation = locationRepository.save(eventDTO.getLocation());
            eventDTO.setLocation(savedLocation);
        } catch (ConstraintViolationException constraintViolationException) {
            Optional<Location> existingLocation = checkIfAlreadyExists(eventDTO.getLocation());
            eventDTO.setLocation(existingLocation.get());
        }
        return eventDTOMapper.dtoToEvent(eventDTO);
    }

    private Optional<Location> checkIfAlreadyExists(Location location) {
        return locationRepository
                .findByStreetAndZipcodeAndStateAndCityAndCountry(
                        location.getStreet(),
                        location.getZipcode(),
                        location.getState(),
                        location.getCity(),
                        location.getCountry()
                );
    }

    public EventDTO update(EventDTO eventDTO, Authentication authentication) {
        Event event = getEvent(eventDTO);
        setUser(eventDTO, event);
        if (eventAuthenticator.isOwner(event, authentication)) {
            Event createdEvent = eventRepository.save(event);
            return eventDTOMapper.eventToDTO(createdEvent);
        } else {
            throw new AccessDeniedException("You are not authorized to perform this action.");
        }
    }

    public void delete(long id, Authentication authentication) {
        Event event = eventRepository.getReferenceById(id);
        if (eventAuthenticator.isOwner(event, authentication) || eventAuthenticator.isAdmin(authentication)) {
            eventRepository.deleteById(id);
        } else {
            throw new AccessDeniedException("You are not authorized to perform this action.");
        }
    }

    public List<EventDTO> findByUser(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).get();
        if (eventAuthenticator.isOwner(user, authentication) || eventAuthenticator.isAdmin(authentication)) {
            return eventRepository.findByUserId(user.getId())
                    .stream()
                    .map(eventDTOMapper::eventToDTO)
                    .toList();
        } else {
            throw new AccessDeniedException("You are not authorized to perform this action.");
        }
    }

    public EventDTO create(EventDTO eventDTO, Authentication authentication) {
        Event event = getEvent(eventDTO);
        User user = userRepository.findByUsername(authentication.getName()).get();
        event.setUser(user);
        Event createdEvent = eventRepository.save(event);
        return eventDTOMapper.eventToDTO(createdEvent);
    }
}
