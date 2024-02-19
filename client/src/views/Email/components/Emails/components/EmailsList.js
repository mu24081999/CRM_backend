import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
const EmailsList = ({ emailsData, emails, onEmailDetail }) => {
  const dispatch = useDispatch();
  const handleEmailClick = (id) => {
    const repliesData = emails.filter((email) => email.parent_id === id);
    const selectedEmail = emailsData.filter((email) => email.id === id)[0];
    const data = {
      subject: selectedEmail?.subject,
      selectedEmail: selectedEmail,
      emails: repliesData,
    };
    onEmailDetail(data);
  };
  return (
    <ul class="email-list list-group list-group-flush">
      {emailsData?.length > 0 &&
        emailsData?.map((email, index) => (
          <li
            onClick={() => handleEmailClick(email.id)}
            class="list-group-item"
            key={index}
          >
            <div class="media">
              <div class="media-head">
                <div class="avatar avatar-sm avatar-rounded">
                  <img
                    // src="dist/img/avatar2.jpg"
                    src={email?.sender?.avatar}
                    alt="user"
                    class="avatar-img"
                  />
                </div>
                <span class="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
              </div>
              <div class="media-body">
                <div>
                  <div>
                    <div class="email-head">{email?.sender?.name}</div>
                    <div>
                      <span class="email-star marked">
                        <span class="feather-icon">
                          <i data-feather="star"></i>
                        </span>
                      </span>
                      <div class="email-time">
                        {moment(email.created_at, "h:mm A").format("h:mm A")}
                      </div>
                    </div>
                  </div>
                  <div class="email-subject">{email.subject}</div>
                  <div class="email-text">
                    <p>{email?.body?.slice(0, 200)}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      {/* <li class="list-group-item">
        <div class="media read-email">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded">
              <img src="dist/img/avatar9.jpg" alt="user" class="avatar-img" />
            </div>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Huma Therman</div>
                <span class="badge badge-warning badge-sm badge-pill">
                  updates
                </span>
                <div>
                  <span class="email-star">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">7:51 AM</div>
                </div>
              </div>
              <div class="email-subject">Proposal for 3rd quarter.</div>
              <div class="email-text">
                <p>
                  Excellent so to no sincerity smallness. Removal request
                  delight if on he we can grow together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media read-email active-user">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-soft-success avatar-rounded">
              <span class="initial-wrap">C</span>
            </div>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Charlie Chaplin</div>
                <div>
                  <span class="email-star">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">Yesterday</div>
                </div>
              </div>
              <div class="email-subject">
                Built a robust platform for jampack.
              </div>
              <div class="email-text">
                <p>
                  So how did the classical latin become so insensive about
                  things tiy do things you change in the world that is insane.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded">
              <img src="dist/img/avatar10.jpg" alt="user" class="avatar-img" />
            </div>
            <span class="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Winston Churchil</div>
                <div>
                  <span class="email-star marked">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">3 Mar</div>
                </div>
              </div>
              <div class="email-subject">Transactions in your account for.</div>
              <div class="email-text">
                <p>
                  Letter wooded direct two men indeed income sister. Impression
                  up admiration he by partiality is.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media read-email">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded">
              <img src="dist/img/avatar3.jpg" alt="user" class="avatar-img" />
            </div>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Jaquiline Joker</div>
                <span class="badge badge-primary badge-sm badge-pill">
                  Team
                </span>
                <div>
                  <span class="email-star marked">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">3 Mar</div>
                </div>
              </div>
              <div class="email-subject">Launching jampack beta version</div>
              <div class="email-text">
                <p>
                  Instantly immediate his saw one day perceived. Old blushes
                  respect but offices hearted minutes effects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media read-email">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded">
              <img src="dist/img/avatar7.jpg" alt="user" class="avatar-img" />
            </div>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Tom Cruz</div>
                <span class="badge badge-success badge-sm badge-pill">
                  support
                </span>
                <div>
                  <span class="email-star">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">28 Feb</div>
                </div>
              </div>
              <div class="email-subject">
                Charges and brokerage plans issue.
              </div>
              <div class="email-text">
                <p>
                  Son read such next see the rest two. Was use extent old entire
                  sus. Curiosity remaining own see repulsive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-soft-danger avatar-rounded">
              <span class="initial-wrap">D</span>
            </div>
            <span class="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Danial Craig</div>
                <div>
                  <span class="email-star">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">25 Feb</div>
                </div>
              </div>
              <div class="email-subject">Invoice for design services.</div>
              <div class="email-text">
                <p>
                  Supposing exquisite daughters eagerness why repulsive for.
                  Praise turned it lovers be warmly by.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media read-email">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-rounded">
              <img src="dist/img/avatar8.jpg" alt="user" class="avatar-img" />
            </div>
            <span class="badge badge-primary badge-indicator badge-indicator-nobdr"></span>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Katherine Jones</div>
                <div>
                  <span class="email-star marked">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">22 Feb</div>
                </div>
              </div>
              <div class="email-subject">Welcome to Jampack team.</div>
              <div class="email-text">
                <p>
                  Incommode our not one ourselves residence. Shall there whose
                  those stand she end.
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item">
        <div class="media read-email">
          <div class="media-head">
            <div class="avatar avatar-sm avatar-success avatar-rounded">
              <span class="initial-wrap">H</span>
            </div>
          </div>
          <div class="media-body">
            <div>
              <div>
                <div class="email-head">Hencework</div>
                <div>
                  <span class="email-star marked">
                    <span class="feather-icon">
                      <i data-feather="star"></i>
                    </span>
                  </span>
                  <div class="email-time">30 Jan</div>
                </div>
              </div>
              <div class="email-subject">
                Dear Danial, regarding reversal of.
              </div>
              <div class="email-text">
                <p>
                  So unaffected partiality indulgence dispatched to of
                  celebrated remarkably. Unfeeling are had allowance..
                </p>
              </div>
            </div>
          </div>
        </div>
      </li> */}
    </ul>
  );
};

export default EmailsList;
