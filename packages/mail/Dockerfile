FROM alpine:latest

RUN apk update
RUN apk add postfix

RUN mkdir -p /var/spool/mail
RUN mkdir -p /var/spool/mail/vhosts

# RUN chown vmail:postdrop /var/spool/mail/vhosts

# User (mails will be sent from user@deltahouse.no)
RUN addgroup -S mailgroup && adduser -S hello -G mailgroup

# USER hello

# Config
WORKDIR /etc/postfix

# COPY main.cf .
# COPY master.cf .

# SMTP port
EXPOSE 25

# Start Postfix in the foreground
CMD ["postfix", "start-fg"]